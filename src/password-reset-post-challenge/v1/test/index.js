'use strict';

var handler = require('../../../_shared/_XK5Fidc.js');
var index = require('../../../_shared/DvTaCl9e.js');
var url = require('url');
require('node:vm');
require('async_hooks');
require('console');
require('stream');
require('node:fs/promises');
require('node:module');

/**
 * No-op {@link PasswordResetPostChallengeTriggerAPI} for use in mock API implementations.
 */
class PasswordResetPostChallengeTriggerAPIStubImpl {
    #cacheAPI = handler.createNoopCacheAPI();
    getCacheAPI() {
        return this.#cacheAPI;
    }
    denyAccess(_reason) { }
    challengeWith(_factor, _options) { }
    challengeWithAny(_factors) { }
    renderPrompt(_promptId, _promptOptions) { }
    sendUserTo(_url) { }
    setResultUrl(_url) { }
    encodeToken(_options) {
        return '';
    }
    validateToken(_options) {
        return { valid: false, reason: '' };
    }
    abort(_message) { }
    hasRedirectPrompt() {
        return false;
    }
    hasRenderPrompt() {
        return false;
    }
}

const event = {
    authentication: {
        methods: [
            {
                name: 'mfa',
                timestamp: '2018-11-13T20:20:39+00:00',
                type: 'email',
            },
        ],
        riskAssessment: {
            supplemental: {
                akamai: {
                    akamaiBot: {
                        type: 'Akamai-Categorized Bot',
                        botnetId: 'googlebot',
                        action: 'Monitor',
                        botCategory: ['Web Search Engine Bots', 'Search Engine Bots'],
                        botScore: 0,
                        botScoreResponseSegment: 'test',
                    },
                    akamaiUserRisk: {
                        uuid: '86b37525-8047-4a3c-8d7a-23e99901da05',
                        username: 'testuser@example.com',
                        emailDomain: 'example.com',
                        ouid: 'm534264',
                        requestid: '19e22e',
                        status: 4,
                        score: 0,
                        general: {
                            aci: '0',
                            db: 'Chrome 85',
                            di: '0fc91b5ec42f5a471c16a85e3e388ca57697c1a9',
                            do: 'Mac OS X 10',
                        },
                        risk: {
                            ugp: 'ie/M',
                            unp: '432/H',
                        },
                        trust: {
                            udbp: 'Chrome85',
                            udfp: '25ba44ec3b391ba4ce5fbbd2979635e254775e7d',
                            udop: 'Mac OS X 10',
                            ugp: 'FR',
                            unp: '12322',
                            utp: 'weekday_3',
                        },
                        allow: 0,
                        action: 'monitor',
                    },
                },
            },
        },
    },
    authorization: {
        roles: [],
    },
    client: {
        client_id: 'gmOWNgklfRm4tyl5YYnl3JDSJy19h1bR',
        external_client_id: 'https://example.com/oauth-client.json',
        metadata: {},
        name: 'All Applications',
        external_metadata_type: 'cimd',
    },
    configuration: {},
    connection: {
        id: 'con_fpe5kj482KO1eOzQ',
        name: 'Username-Password-Authentication',
        strategy: 'auth0',
        metadata: {},
    },
    custom_domain: {
        domain: 'login.{{YOUR_DOMAIN}}.com',
        domain_metadata: {
            environment: 'production',
            region: 'us-west-2',
        },
    },
    prompt: {
        id: 'prompt_1234567890',
        fields: {},
        vars: {},
    },
    request: {
        body: {
            client_id: 'client-id',
            client_secret: 'client-secret',
            audience: '{{TENANT}}.auth0.com/api/v2',
            grant_type: 'client_credentials',
        },
        geoip: {
            cityName: 'Bellevue',
            countryName: 'United States of America',
            latitude: 47.61793,
            longitude: -122.19584,
            continentCode: 'NA',
            countryCode: 'US',
            countryCode3: 'USA',
            subdivisionCode: 'WA',
            subdivisionName: 'Washington',
            timeZone: 'America/Los_Angeles',
        },
        ip: '13.33.86.47',
        method: 'POST',
        hostname: '{{TENANT}}.auth0.com',
        language: 'en',
        user_agent: 'curl/7.64.1',
        query: {
            protocol: 'oauth2',
            client_id: 'gmOWNgklfRm4tyl5YYnl3JDSJy19h1bR',
            response_type: 'code',
            connection: 'Username-Password-Authentication',
            prompt: 'login',
            scope: 'openid profile',
            redirect_uri: 'https://example/tester/callback?connection=Username-Password-Authentication',
        },
    },
    secrets: {},
    stats: {
        logins_count: 62,
    },
    tenant: {
        id: '{{TENANT}}',
    },
    user: {
        user_id: 'auth0|5f7c8ec7c33c6c004bbafe82',
        app_metadata: {},
        created_at: '{{DATE}}',
        email: 'j+smith@example.com',
        email_verified: true,
        identities: [],
        name: 'j+smith@example.com',
        nickname: 'j+smith',
        picture: 'http://www.gravatar.com/avatar/?d=identicon',
        updated_at: '{{DATE}}',
        user_metadata: {},
        family_name: 'Smith',
        given_name: 'John',
        last_password_reset: '{{DATE}}',
        phone_number: '18882352699',
        phone_verified: false,
        username: 'jsmith',
        enrolledFactors: [],
    },
    transaction: {
        acr_values: [],
        locale: 'en',
        requested_scopes: [],
        ui_locales: ['en'],
        protocol: 'oidc-basic-profile',
        redirect_uri: 'http://someuri.com',
        prompt: ['none'],
        login_hint: 'test@test.com',
        response_mode: 'form_post',
        response_type: ['id_token'],
        state: 'AABBccddEEFFGGTTasrs',
        requested_authorization_details: [
            {
                type: 'foo',
            },
        ],
        linking_id: 'abc_dynamic_linking_id_123',
        correlation_id: 'abcefg123',
    },
    organization: {
        display_name: 'My Organization',
        id: 'org_juG7cAQ0CymOcVpV',
        metadata: {},
        name: 'my-organization',
    },
};

class AccessAPIImpl {
    #triggerAPI;
    constructor(triggerAPI) {
        this.#triggerAPI = triggerAPI;
    }
    deny(reason) {
        this.#triggerAPI.denyAccess(reason);
    }
}

class AuthenticationAPIImpl {
    #triggerAPI;
    constructor(triggerAPI) {
        this.#triggerAPI = triggerAPI;
    }
    challengeWithAny(factors) {
        this.#triggerAPI.challengeWithAny(factors);
    }
    challengeWith(factor, options) {
        this.#triggerAPI.challengeWith(factor, options);
    }
}

class PromptAPIImpl {
    #triggerAPI;
    constructor(triggerAPI) {
        this.#triggerAPI = triggerAPI;
    }
    render(promptId, promptOptions) {
        if (this.#triggerAPI.hasRedirectPrompt()) {
            this.#triggerAPI.abort('Redirect and render commands cannot be used in the same action.');
            return;
        }
        if (this.#triggerAPI.hasRenderPrompt()) {
            this.#triggerAPI.abort('Only 1 render command per action is allowed.');
            return;
        }
        const resolvedPromptOptions = promptOptions || {};
        index.validate(index.PasswordResetPostChallengeRenderPromptInputCodec, {
            promptId,
            promptOptions: resolvedPromptOptions,
        });
        if (Buffer.byteLength(JSON.stringify(resolvedPromptOptions), 'utf-8') >
            index.MAX_RENDER_PROMPT_OPTIONS_BYTES) {
            throw new Error(`The total size of the prompt options exceeds the limit of ${index.MAX_RENDER_PROMPT_OPTIONS_BYTES} bytes.`);
        }
        this.#triggerAPI.renderPrompt(promptId, resolvedPromptOptions);
    }
}

const DEFAULT_SESSION_TOKEN_EXP = 60 * 15; // 15 minutes
const DEFAULT_SESSION_TOKEN_QUERY_PARAM = 'session_token';
class RedirectAPIImpl {
    #getContinueParams = (request) => {
        return {
            ...request?.query,
            ...request?.body,
        };
    };
    #triggerAPI;
    #context;
    constructor(triggerAPI, context) {
        this.#triggerAPI = triggerAPI;
        this.#context = context;
    }
    encodeToken(options) {
        const issuedAt = Math.floor(Date.now() / 1000);
        const payload = {
            iat: issuedAt,
            iss: this.#context.request.hostname,
            sub: this.#context.user.user_id,
            exp: issuedAt + (options.expiresInSeconds ?? DEFAULT_SESSION_TOKEN_EXP),
            ip: this.#context.request.ip,
            ...options.payload,
        };
        return this.#triggerAPI.encodeToken({
            payload,
            secret: options.secret,
        });
    }
    sendUserTo(baseUrl, urlOptions) {
        if (this.#triggerAPI.hasRenderPrompt()) {
            this.#triggerAPI.abort('Redirect and render commands cannot be used in the same action.');
            return;
        }
        const url$1 = new url.URL(baseUrl);
        if (urlOptions?.query) {
            for (const param in urlOptions.query) {
                url$1.searchParams.set(param, urlOptions.query[param]);
            }
        }
        this.#triggerAPI.sendUserTo(url$1.href);
    }
    validateToken(options) {
        options.tokenParameterName ||= DEFAULT_SESSION_TOKEN_QUERY_PARAM;
        const params = this.#getContinueParams(this.#context.request);
        const token = params[options.tokenParameterName];
        if (!token) {
            throw new Error(`There is no parameter called '${options.tokenParameterName}' available in either the POST body or query string.`);
        }
        const response = this.#triggerAPI.validateToken({
            token: token,
            secret: options.secret,
            issuer: this.#context.request.hostname,
            expectedState: params.state,
            expectedSub: this.#context.user.user_id,
        });
        if (!response.valid) {
            throw new Error(`The session token is invalid: ${response.reason}`);
        }
        return response.payload;
    }
}

class TransactionAPIImpl {
    #triggerAPI;
    constructor(triggerAPI) {
        this.#triggerAPI = triggerAPI;
    }
    setResultUrl(url$1, urlOptions) {
        const resultUrl = new url.URL(url$1);
        if (urlOptions?.query) {
            for (const param in urlOptions.query) {
                resultUrl.searchParams.set(param, urlOptions.query[param]);
            }
        }
        this.#triggerAPI.setResultUrl(resultUrl.href);
    }
}

class PasswordResetPostChallengeAPIImpl {
    access;
    authentication;
    prompt;
    redirect;
    cache;
    transaction;
    constructor(triggerAPI, redirectContext) {
        this.cache = triggerAPI.getCacheAPI();
        this.access = new AccessAPIImpl(triggerAPI);
        this.authentication = new AuthenticationAPIImpl(triggerAPI);
        this.prompt = new PromptAPIImpl(triggerAPI);
        this.redirect = new RedirectAPIImpl(triggerAPI, redirectContext);
        this.transaction = new TransactionAPIImpl(triggerAPI);
    }
}

function contextToArguments(ctx) {
    return [ctx.event, new PasswordResetPostChallengeAPIImpl(ctx.triggerAPI, ctx.redirectContext)];
}
const getHandler = handler.getHandlerFactory([
    'onExecutePostChallenge',
    'onContinuePostChallenge',
]);

/**
 * Builds `contextToArguments` input for tests: a fresh clone of the example event paired with a stubbed
 * {@link PasswordResetPostChallengeTriggerAPI} and redirect context. The event is cloned per call so
 * mutations in one execution don't leak into the next.
 */
function getDefaultArguments() {
    const event$1 = handler.deepClone(event);
    const redirectContext = {
        request: {
            hostname: event$1.request.hostname,
            ip: event$1.request.ip,
            query: event$1.request.query,
            body: event$1.request.body,
        },
        user: {
            user_id: event$1.user.user_id,
        },
    };
    return contextToArguments({
        event: event$1,
        triggerAPI: new PasswordResetPostChallengeTriggerAPIStubImpl(),
        redirectContext,
    });
}
/** Loads a PasswordResetPostChallenge v1 action file for use in tests, e.g. `action.execute('onExecutePostChallenge', event, api)`. */
const loadAction = handler.createLoader(getHandler);

exports.getDefaultArguments = getDefaultArguments;
exports.loadAction = loadAction;
