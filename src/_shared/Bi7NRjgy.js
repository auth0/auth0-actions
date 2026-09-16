'use strict';

var index = require('./DvTaCl9e.js');

const { assertValidScope, MAX_SCOPE_COUNT_LIMIT } = index.helpers.accessToken;
/**
 * Implements the {@link TargetScopesAPI} for managing target scopes: validates
 * arguments, tracks the scope set, and delegates to a
 * {@link TargetScopesWriterAPI} to record the resulting command.
 *
 * Note: commands are recorded before the local scope set is updated, so a
 * writer failure leaves the scope set unchanged.
 */
class TargetScopesAPIImpl {
    #scopesWriter;
    #targetScopes;
    constructor(scopesWriter, initialTargetScopes) {
        this.#scopesWriter = scopesWriter;
        this.#targetScopes = new Set(initialTargetScopes);
    }
    addTargetScope(scope) {
        if (typeof scope !== 'string') {
            throw new TypeError('The value for the scope must be a string.');
        }
        const trimmedScope = scope.trim();
        assertValidScope(trimmedScope);
        if (!this.#targetScopes.has(trimmedScope) && this.#targetScopes.size >= MAX_SCOPE_COUNT_LIMIT) {
            throw new Error(`The number of scopes exceeds the allowed maximum of ${MAX_SCOPE_COUNT_LIMIT}.`);
        }
        this.#scopesWriter.addTargetScope(trimmedScope);
        this.#targetScopes.add(trimmedScope);
    }
    removeTargetScope(scope) {
        if (typeof scope !== 'string') {
            throw new TypeError('The value for the scope must be a string.');
        }
        const trimmedScope = scope.trim();
        assertValidScope(trimmedScope);
        this.#scopesWriter.removeTargetScope(trimmedScope);
        this.#targetScopes.delete(trimmedScope);
    }
    setTargetScopes(scopes) {
        if (!Array.isArray(scopes)) {
            throw new TypeError('The value for scopes must be an array.');
        }
        // Empty array is a valid input and should clear all target scopes
        if (scopes.length === 0) {
            return this.clearTargetScopes();
        }
        for (const scope of scopes) {
            if (typeof scope !== 'string') {
                throw new TypeError('The value for the scope must be a string.');
            }
            assertValidScope(scope.trim());
        }
        const uniqueScopes = [...new Set(scopes.map((s) => s.trim()))];
        if (uniqueScopes.length > MAX_SCOPE_COUNT_LIMIT) {
            throw new Error(`The number of scopes exceeds the allowed maximum of ${MAX_SCOPE_COUNT_LIMIT}.`);
        }
        this.#scopesWriter.setTargetScopes(uniqueScopes);
        this.#targetScopes.clear();
        for (const s of uniqueScopes) {
            this.#targetScopes.add(s);
        }
    }
    clearTargetScopes() {
        this.#scopesWriter.clearTargetScopes();
        this.#targetScopes.clear();
    }
    getTargetScopes() {
        // Return a copy to prevent external mutation of the scope set
        return [...this.#targetScopes];
    }
}
/**
 * A no-op {@link TargetScopesWriterAPI}. Backs stub trigger APIs so the target
 * scope methods still validate and reads still reflect prior writes.
 */
class NoopTargetScopesWriterAPI {
    addTargetScope(_scope) { }
    removeTargetScope(_scope) { }
    setTargetScopes(_scopes) { }
    clearTargetScopes() { }
}
/**
 * Creates a {@link TargetScopesAPI} backed by {@link NoopTargetScopesWriterAPI}
 * for use in stub trigger API implementations.
 */
function createNoopTargetScopesAPI(initialTargetScopes = []) {
    return new TargetScopesAPIImpl(new NoopTargetScopesWriterAPI(), initialTargetScopes);
}

exports.createNoopTargetScopesAPI = createNoopTargetScopesAPI;
