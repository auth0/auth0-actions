'use strict';

var node_vm = require('node:vm');
var async_hooks = require('async_hooks');
var console = require('console');
var stream = require('stream');
var promises = require('node:fs/promises');
var node_module = require('node:module');

/**
 * @param obj
 * @returns
 *
 * @license
 *
 * MIT License
 *
 * Copyright (c) 2020 Vadim @streamich Dalecky
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
const isArray = Array.isArray;
/**
 * Create a deep copy of a plain-old JavaScript object.
 *
 * This function *SHOULD NOT* be used on anything more complex, such as `Map`,
 * `Set` or any other class _instance_.
 *
 * @param obj object to clone
 * @returns a copy of `obj`
 */
function deepClone(obj) {
    if (!obj)
        return obj;
    if (isArray(obj)) {
        const arr = [];
        const length = obj.length;
        for (let i = 0; i < length; i++)
            arr.push(deepClone(obj[i]));
        return arr;
    }
    else if (typeof obj === 'object') {
        const keys = Object.keys(obj);
        const length = keys.length;
        const newObject = {};
        for (var i = 0; i < length; i++) {
            const key = keys[i];
            newObject[key] = deepClone(obj[key]);
        }
        return newObject;
    }
    return obj;
}

// The 256kb is also implemented in Actions
const LOG_LIMIT = 256 * 1024;
class LogBuffer {
    chunks = [];
    byteLength = 0;
    maxLength;
    destroyed = false;
    constructor(maxLength) {
        this.maxLength = maxLength;
    }
    destroy() {
        this.destroyed = true;
        this.chunks.length = 0;
        this.byteLength = 0;
    }
    pushChunk(chunk) {
        if (this.destroyed) {
            return;
        }
        if (this.byteLength >= this.maxLength) {
            return;
        }
        // Trim the chunk if necessary
        if (this.byteLength + chunk.length > this.maxLength) {
            const chunkSlice = Math.max(0, this.maxLength - this.byteLength);
            chunk = chunk.subarray(0, chunkSlice);
        }
        this.byteLength += chunk.length;
        this.chunks.push(chunk);
    }
    /**
     * Get the accumulated logs for this async continuation and mark the instance
     * as destroyed.
     *
     * @returns the accumulated logs as a string
     */
    getLogs() {
        const logs = Buffer.concat(this.chunks, this.byteLength).toString('utf-8');
        this.destroy();
        return logs;
    }
}
class HostAPI {
    static #als = new async_hooks.AsyncLocalStorage();
    runWithExecutionContext(store, callback, ...args) {
        return HostAPI.#als.run(store, callback, ...args);
    }
    getExecutionContext() {
        return HostAPI.#als.getStore();
    }
}
function isExecutionContext(store) {
    return typeof store === 'object' && store !== null && 'logBuffer' in store;
}
function createTransform(getExecutionContext) {
    return function transform(chunk, _encoding, callback) {
        const store = getExecutionContext();
        if (isExecutionContext(store)) {
            if (store.logBuffer) {
                store.logBuffer.pushChunk(chunk);
            }
        }
        callback(undefined, chunk);
    };
}
function createContextAwareConsole(stdout, stderr, getExecutionContext) {
    const transform = createTransform(getExecutionContext);
    const sinkStdout = new stream.Stream.Transform({
        transform,
    });
    sinkStdout.on('data', forwardData(stdout));
    const sinkStdErr = new stream.Stream.Transform({
        transform,
    });
    sinkStdErr.on('data', forwardData(stderr));
    return new console.Console(sinkStdout, sinkStdErr);
}
function forwardData(sink) {
    return function write(chunk) {
        if (!sink.destroyed && sink.writable) {
            sink.write(chunk);
        }
    };
}

async function compileActionModule(compiler, script) {
    return new Promise((resolve, reject) => {
        // Wrap the Action in minimal boilerplate so that initialization can be deferred until
        // we have a custom Console instance to inject. The wrapper allows us to capture the Action's
        // handler function (e.g. onExecutePostLogin) from `module` and/or `exports`.
        const wrappedScript = `module.exports = function(module, exports, console){\n${script}\n};`;
        compiler(wrappedScript, (err, actionInitializerFn) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(actionInitializerFn);
        });
    });
}
class ActionsRunner {
    #hostAPI;
    #mod = { exports: {} };
    #modError = undefined;
    #initialized = false;
    #initializerFn;
    #console;
    constructor(hostAPI, initializerFn) {
        this.#hostAPI = hostAPI;
        this.#initializerFn = initializerFn;
        // Create a Console that routes stdout/stderr into the active execution's LogBuffer.
        // It uses AsyncLocalStorage to correctly attribute log output even when multiple
        // Action executions are interleaved across async boundaries.
        //
        // The Console is created at the instance level so the same reference is reused across
        // executions, keeping the Action cacheable without requiring an injected console argument.
        this.#console = createContextAwareConsole(process.stdout, process.stderr, this.#hostAPI.getExecutionContext.bind(this.#hostAPI));
    }
    getConsole() {
        return this.#console;
    }
    async execute(fn, options) {
        return await this.#hostAPI.runWithExecutionContext({ logBuffer: options.logBuffer }, async () => {
            // Lazy load the Action on first execution so top-level console output is captured.
            if (!this.#initialized) {
                this.#initialized = true;
                try {
                    if (!this.#initializerFn) {
                        throw new Error('Compiler did not return an initializer function');
                    }
                    // Invoke the deferred initializer, supplying the captured module scope and the
                    // context-aware Console so the Action's exports and logs are both intercepted.
                    this.#initializerFn(this.#mod, this.#mod.exports, this.#console);
                }
                catch (err) {
                    // Synchronous error thrown during Action module initialization.
                    this.#modError = toError(err);
                }
            }
            // When the script failed to initialize correctly, re-throw the same error on every
            // subsequent call. Without this, a module that throws at the top level would fail
            // on the first execution but succeed on all later ones.
            if (this.#modError) {
                throw this.#modError;
            }
            return await fn(this.#mod.exports);
        });
    }
}
function toError(obj) {
    if (!obj) {
        return new Error('Unknown error');
    }
    if (!(obj instanceof Error)) {
        return new Error(String(obj));
    }
    return obj;
}

function nodeJsModuleCompiler(code, path, requireFn, options = {}) {
    const { pseudoGlobals = {}, customConsole, parsingContext } = options;
    const mod = { exports: {} };
    const namedArgs = {
        module: mod,
        exports: mod.exports,
        require: requireFn,
        ...pseudoGlobals,
    };
    if (customConsole !== undefined) {
        namedArgs.console = customConsole;
    }
    const fn = node_vm.compileFunction(code, Object.keys(namedArgs), { filename: path, parsingContext });
    fn(...Object.values(namedArgs));
    return mod.exports;
}
function actionsModuleCompiler(code, path, secrets, hostRequire, hostAPI, parsingContext) {
    let wasCompiled = false;
    let hadModError = false;
    let mod;
    let modErr;
    return function loadActionsModule() {
        if (wasCompiled) {
            if (hadModError) {
                throw modErr;
            }
            return mod;
        }
        wasCompiled = true;
        const contextConsole = createContextAwareConsole(process.stdout, process.stderr, hostAPI.getExecutionContext.bind(hostAPI));
        try {
            mod = nodeJsModuleCompiler(code, path, hostRequire, {
                pseudoGlobals: { actions: { secrets } },
                customConsole: contextConsole,
                parsingContext,
            });
        }
        catch (err) {
            hadModError = true;
            modErr = err;
            throw err;
        }
        return mod;
    };
}

const ACTIONS_MODULE_PREFIX = 'actions:';
async function moduleLoader(filename, parsingContext) {
    const code = await promises.readFile(filename, 'utf8');
    const actionsBaseRequire = node_module.createRequire(filename);
    const hostAPI = new HostAPI();
    // Lazy loaders for registered `actions:` modules. The loader function itself is built
    // eagerly at registration time, but each call only compiles the module and runs its
    // top-level code the first time, so that init-time logs are captured under the active
    // AsyncLocalStorage execution context rather than at registration time. Each loader
    // caches its result (or thrown error), so repeated requires of the same module return
    // the same exports object.
    const modLoaderCache = new Map();
    // Mirrors actionsBaseRequire's resolve/cache/extensions/main so that customer code calling
    // require.resolve(...) etc. on this merged require sees the same behavior it would from the
    // plain node require, per the webtask-sandbox `makeRequireFunction` reference.
    const actionRequireFn = (request) => {
        // if we have already cached an action module loader for this request, invoke it
        // and return its exports
        const load = modLoaderCache.get(request);
        if (load !== undefined) {
            return load();
        }
        // otherwise use the default node require
        return actionsBaseRequire(request);
    };
    actionRequireFn.resolve = actionsBaseRequire.resolve;
    actionRequireFn.cache = actionsBaseRequire.cache;
    actionRequireFn.extensions = actionsBaseRequire.extensions;
    actionRequireFn.main = actionsBaseRequire.main;
    const actionInitializerFn = await compileActionModule((script, cb) => {
        try {
            cb(null, nodeJsModuleCompiler(script, filename, actionRequireFn, {
                parsingContext,
            }));
        }
        catch (err) {
            cb(err instanceof Error ? err : new Error(String(err)), undefined);
        }
    }, code);
    return {
        runner: new ActionsRunner(hostAPI, actionInitializerFn),
        registerActionsModule: async (name, moduleFilename, secrets = {}) => {
            const modKey = `${ACTIONS_MODULE_PREFIX}${name}`;
            if (modLoaderCache.has(modKey)) {
                throw new Error(`Module '${modKey}' is already registered`);
            }
            const modCode = await promises.readFile(moduleFilename, 'utf8');
            const modRequire = node_module.createRequire(moduleFilename);
            const loadFn = actionsModuleCompiler(modCode, moduleFilename, secrets, modRequire, hostAPI, parsingContext);
            modLoaderCache.set(modKey, loadFn);
        },
    };
}

// When `createContext(globalThis)` is called by code already running inside a vm context, the
// object passed in is returned. In this case, `parsingContext === globalThis` would evaluate to
// true. In V8 10.1–10.8 / Node 18.0–19.9, a global that was mutated after the context was created
// (e.g. `jest.spyOn(global, 'fetch')`) is invisible to the newly compiled function, triggering a
// `ReferenceError`, even though getOwnPropertyDescriptor would confirm fetch was present. This only
// surfaces in nested-vm environments like Jest. To work around it, use a Proxy rather than a
// shallow copy of `target`: a copy would go stale once the globals change after this call, and
// would also drop non-enumerable properties that the Proxy forwards transparently.
function liveGlobal(target) {
    const dynamicTarget = target;
    return new Proxy(Object.create(null), {
        get(_, key) {
            return dynamicTarget[key];
        },
        set(_, key, value) {
            dynamicTarget[key] = value;
            return true;
        },
        has(_, key) {
            return key in dynamicTarget;
        },
        deleteProperty(_, key) {
            return delete dynamicTarget[key];
        },
        ownKeys() {
            return Reflect.ownKeys(dynamicTarget);
        },
        getOwnPropertyDescriptor(_, key) {
            const desc = Object.getOwnPropertyDescriptor(dynamicTarget, key);
            return desc && { ...desc, configurable: true };
        },
        defineProperty(_, key, desc) {
            Object.defineProperty(dynamicTarget, key, desc);
            return true;
        },
        getPrototypeOf() {
            return null;
        },
    });
}
const AFFECTED_NODE_MAJORS = new Set([18, 19]);
function buildParsingTarget(target) {
    const nodeMajor = Number(process.versions.node.split('.')[0]);
    return AFFECTED_NODE_MAJORS.has(nodeMajor) ? liveGlobal(target) : target;
}
function createLoader(getHandler) {
    return async function loadAction(filename, modules = []) {
        // vm.compileFunction() (called from nodeJsModuleCompiler) defaults to compiling/running
        // against the process's root realm, not whichever realm this module itself happens to be
        // running in. In the production runtime there's only one realm, but under Jest compiled
        // actions run with the node process's original globals instead of the ones the test file
        // is mocking. "Contextifying" the result of buildParsingTarget(globalThis) ensures code runs
        // under the modified global values (e.g. jest.spyOn), whether that's globalThis itself or the
        // live-forwarding Proxy standing in for it on affected Node versions (see buildParsingTarget above).
        //
        // When node 18 is no longer a supported runtime, buildParsingTarget can be removed.
        const parsingContext = node_vm.createContext(buildParsingTarget(globalThis));
        const { runner, registerActionsModule } = await moduleLoader(filename, parsingContext);
        for (const { name, filename: moduleFilename, secrets } of modules) {
            await registerActionsModule(name, moduleFilename, secrets);
        }
        return {
            async execute(entrypoint, ...args) {
                const logBuffer = new LogBuffer(LOG_LIMIT);
                await runner.execute((modExports) => {
                    const handler = getHandler(modExports, entrypoint);
                    return handler(...args);
                }, {
                    logBuffer,
                });
                // store logs right after execute() resolves, mirroring production. A promise that was
                // not awaited could write to logBuffer after, racing with a lazy getLogs() call.
                const logs = logBuffer.getLogs();
                return { getLogs: () => logs };
            },
        };
    };
}

// The default ttl of a cache record is 15 minutes. This should be sent by Actions in the future.
const DEFAULT_CACHE_TTL = 15 * 60 * 1000;
const MAX_KEY_BYTES = 64;
const MAX_VALUE_BYTES = 4096;
// Adding a little bit of padding for the serialization overhead and at least 2 keys of 64 bytes + 4kb of data
const MAX_TOTAL_CACHE_BYTES = (16 * 1024) + 256;

// This validator currently uses hard-coded values. We will want to have Actions send these values over in the future.
function canSetNewCacheRecord(cache, key, value) {
    const keySize = Buffer.byteLength(key, 'utf-8');
    const valueSize = Buffer.byteLength(value, 'utf-8');
    // Cache keys are limited to 64 bytes
    if (keySize > MAX_KEY_BYTES) {
        return {
            type: 'error',
            code: 'CacheKeySizeExceeded',
        };
    }
    // Cache values are limited to 4096 bytes
    if (valueSize > MAX_VALUE_BYTES) {
        return {
            type: 'error',
            code: 'CacheValueSizeExceeded',
        };
    }
    // Total cache size must not exceed 8,192 bytes
    const cacheSize = getCacheSize(cache);
    if (cacheSize + keySize + valueSize > MAX_TOTAL_CACHE_BYTES) {
        return {
            type: 'error',
            code: 'CacheSizeExceeded',
        };
    }
    return {
        type: 'success',
    };
}
function getCacheSize(cache) {
    let allCharacters = '';
    for (const key of cache.keys()) {
        allCharacters += key;
    }
    for (const value of cache.values()) {
        allCharacters += value.value;
    }
    return Buffer.byteLength(allCharacters, 'utf-8');
}

/**
 * A {@link CacheWriterAPI} that does not persisting mutations beyond the lifetime
 * of a single tested action. Backs stub trigger APIs so `api.cache` behaves
 * like a real, working cache (reads reflect prior writes).
 */
class NoopCacheWriterAPI {
    setCacheValue(key, value, expiresAt) {
        return { type: 'success', record: { value, expires_at: expiresAt } };
    }
    deleteCacheValue(_key) {
        return { type: 'success' };
    }
}
/**
 * Creates a {@link CacheAPI} backed by {@link NoopCacheWriterAPI} for use in
 * stub trigger API implementations.
 */
function createNoopCacheAPI() {
    return new CacheAPIImpl(new NoopCacheWriterAPI(), new Map());
}
class CacheAPIImpl {
    #cacheWriter;
    #cacheData;
    constructor(cacheWriter, cacheData) {
        this.#cacheWriter = cacheWriter;
        this.#cacheData = cacheData;
    }
    delete(key) {
        const cache = this.#cacheData;
        const cacheEntry = this.#cacheData.get(key);
        // We want to make sure we are able to both delete the value and persist the result
        if (!cacheEntry) {
            return {
                type: 'error',
                code: 'CacheKeyDoesNotExist',
            };
        }
        // The key exists so it's safe to persist the result
        const writeResult = this.#cacheWriter.deleteCacheValue(key);
        if (writeResult.type === 'error') {
            return writeResult;
        }
        // Now that the command was registered we can delete it locally
        const deleted = cache.delete(key);
        if (!deleted) {
            return {
                type: 'error',
                code: 'FailedToDeleteCacheRecord',
            };
        }
        return {
            type: 'success',
        };
    }
    get(key) {
        const record = this.#cacheData.get(key);
        if (!record) {
            return;
        }
        if (record.expires_at < Date.now()) {
            return;
        }
        return record;
    }
    set(key, value, options) {
        const cache = this.#cacheData;
        // These validate that the total cache size limit is within limits
        const cacheSizeValidation = canSetNewCacheRecord(cache, key, value);
        if (cacheSizeValidation.type === 'error') {
            return cacheSizeValidation;
        }
        const now = Date.now();
        let expiresAt = undefined;
        const suppliedTTL = options?.ttl;
        if (typeof suppliedTTL !== 'undefined') {
            if (isFiniteNumber(suppliedTTL)) {
                expiresAt = now + Math.floor(suppliedTTL);
            }
            else {
                return {
                    type: 'error',
                    code: 'InvalidExpiry',
                };
            }
        }
        const suppliedExpiresAt = options?.expires_at;
        if (typeof suppliedExpiresAt !== 'undefined') {
            if (isFiniteNumber(suppliedExpiresAt)) {
                // Let's further check if an explicit `expires_at` was supplied. If so
                // it must be earlier than the expiry implied by a `ttl` option.
                if (isFiniteNumber(expiresAt)) {
                    expiresAt = Math.min(expiresAt, Math.floor(suppliedExpiresAt));
                }
                else {
                    expiresAt = Math.floor(suppliedExpiresAt);
                }
            }
            else {
                return {
                    type: 'error',
                    code: 'InvalidExpiry',
                };
            }
        }
        if (!isFiniteNumber(expiresAt)) {
            // No expiry hints provided so we use the default
            expiresAt = now + DEFAULT_CACHE_TTL;
        }
        if (expiresAt <= now) {
            return {
                type: 'error',
                code: 'ItemAlreadyExpired',
            };
        }
        if (!Number.isSafeInteger(expiresAt)) {
            return {
                type: 'error',
                code: 'InvalidExpiry',
            };
        }
        // Add the command first to make sure the cache is not modified if we fail to persist the command
        const writeResult = this.#cacheWriter.setCacheValue(key, value, expiresAt);
        // Only check error case since the local cache still need updating
        if (writeResult.type === 'error') {
            return writeResult;
        }
        cache.set(key, { value, expires_at: expiresAt });
        const record = cache.get(key);
        if (!record) {
            return {
                type: 'error',
                code: 'FailedToSetCacheRecord',
            };
        }
        return {
            type: 'success',
            record,
        };
    }
}
function isFiniteNumber(n) {
    return typeof n === 'number' && Number.isFinite(n);
}

/**
 * isEntrypoint checks if the entrypoint is a string and is one of the valid entrypoints.
 * @param entrypoints List of valid entrypoints
 * @param entrypoint The entrypoint to check, this is an unknown value.
 * @returns {boolean}
 */
function isEntrypoint(entrypoints, entrypoint) {
    return typeof entrypoint === 'string' && entrypoints.includes(entrypoint);
}
/**
 * isExport checks if the exports object is a valid object.
 * @param exports
 * @returns {boolean}
 */
function isExport(exports) {
    return typeof exports === 'object' && exports !== null;
}
/**
 * isAction validates that the function is an async function.
 * We can't assume that there will be 2 arguments, because customers can omit those
 * and it would still be a valid function.
 *
 * @param fn
 * @returns
 */
function isAction(fn) {
    return (!!fn && typeof fn === 'function' && fn.constructor && fn.constructor.name === 'AsyncFunction');
}
/**
 * Create an event handler for a particular set of entrypoints.
 * @param entrypoints
 * @returns
 */
function getHandlerFactory(entrypoints) {
    if (entrypoints.length === 0) {
        throw new Error(`The compiler must support at least one entrypoint.`);
    }
    return function (exports, entrypoint) {
        if (!isExport(exports)) {
            throw new Error('The Action must export an object.');
        }
        let exportName = entrypoints[0];
        if (entrypoint) {
            if (!isEntrypoint(entrypoints, entrypoint)) {
                throw new Error(`The Action can only be called with valid methods.`);
            }
            exportName = entrypoint;
        }
        const fn = exports[exportName];
        if (!isAction(fn)) {
            throw new Error(`Invalid function signature for the ${JSON.stringify(exportName)} handler. Use "exports.${exportName} = async function(event, api) { }" as the signature.`);
        }
        return fn;
    };
}

exports.createLoader = createLoader;
exports.createNoopCacheAPI = createNoopCacheAPI;
exports.deepClone = deepClone;
exports.getHandlerFactory = getHandlerFactory;
