'use strict';

var handler = require('../../../_shared/_XK5Fidc.js');
var metadata = require('../../../_shared/Dygdkb3A.js');
var targetScopes = require('../../../_shared/CG3qLr9m.js');
var index = require('../../../_shared/Db5gBOLD.js');
var url = require('url');
require('node:vm');
require('async_hooks');
require('console');
require('stream');
require('node:fs/promises');
require('node:module');

/**
 * No-op {@link PostLoginTriggerAPI} for use in mock API implementations.
 */
class PostLoginTriggerAPIStubImpl {
    #cacheAPI = handler.createNoopCacheAPI();
    #transactionMetadataAPI = metadata.createNoopTransactionMetadataAPI();
    #targetScopesAPI;
    constructor(initialTargetScopes = []) {
        this.#targetScopesAPI = targetScopes.createNoopTargetScopesAPI(initialTargetScopes);
    }
    getCacheAPI() {
        return this.#cacheAPI;
    }
    getTransactionMetadataAPI() {
        return this.#transactionMetadataAPI;
    }
    getTargetScopesAPI() {
        return this.#targetScopesAPI;
    }
    getUserGroups(_userId, _params) {
        return Promise.resolve({ groups: [] });
    }
    hasGroupMembership(_userId, _connectionId, _organizationId, _groups) {
        return Promise.resolve({ memberships: {} });
    }
    getUserEffectiveRoles(_userId, _organizationId, _params) {
        return Promise.resolve({ roles: [] });
    }
    getUserEffectiveRolesByIds(_userId, _organizationId, _ids) {
        return Promise.resolve({ roles: [] });
    }
    getUserEffectiveRolesByNames(_userId, _organizationId, _names) {
        return Promise.resolve({ roles: [] });
    }
    denyAccess(_reason) { }
    setCustomClaim(_target, _key, _value) { }
    modifyScope(_target, _modifications) { }
    challengeWith(_factor, _options) { }
    challengeWithAny(_factors) { }
    enrollWith(_factor, _options) { }
    enrollWithAny(_factors) { }
    recordMethod(_providerUrl) { }
    hasSetPrimaryUser() {
        return false;
    }
    setPrimaryUser(_primaryUserId) { }
    requireMultifactorAuth(_provider, _options) { }
    setMetadata(_target, _key, _value) { }
    renderPrompt(_promptId, _promptOptions) { }
    sendUserTo(_url) { }
    hasRedirectPrompt() {
        return false;
    }
    hasRenderPrompt() {
        return false;
    }
    encodeToken(_options) {
        return '';
    }
    validateToken(_options) {
        return { valid: false, reason: '' };
    }
    revokeRefreshToken(_reason) { }
    setRefreshTokenExpiration(_inactivity, _absolute) { }
    setRefreshTokenMetadata(_metadata) { }
    revokeSession(_reason, _options) { }
    setSessionExpiration(_inactivity, _absolute) { }
    setSessionMetadata(_metadata) { }
    setCookieMode(_mode) { }
    getSAMLAttributes() {
        return {};
    }
    setSAMLAttribute(_attribute, _value) { }
    setSAMLConfiguration(_configs) { }
    validationError(_errorCode, _errorMessage) { }
    abort(_message) { }
}

const event = {
    transaction: {
        id: 'nZniEmn3ejOpcV46_ac1CxJCuO_gAuwR',
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
        subject_token_type: 'http://acme.com/subject-token',
        actor: {
            sub: 'actor-sub',
            act: {
                sub: 'actor-sub-level-2',
                act: {
                    sub: 'actor-sub-level-3',
                    act: {
                        sub: 'actor-sub-level-4',
                        act: {
                            sub: 'actor-sub-level-5',
                        },
                    },
                },
            },
        },
        actor_token_type: 'http://my-idp/id-token',
        metadata: {},
    },
    agent: {
        agent_id: 'agt_abc123',
        name: 'My Agent',
        agent_metadata: {
            env: 'production',
        },
    },
    anonymous_session: {
        user_id: 'anon@5bdbd57d-cb7a-4cbb-b938-c0499a31ad52',
        session_id: 'anon_sess@f727e268-46da-4c7d-ad57-b8c80318c295',
        created_at: '2024-01-01T00:00:00.000Z',
        expires_at: '2024-01-01T01:00:00.000Z',
        metadata: {
            source: 'web',
        },
    },
    authentication: {
        methods: [
            {
                name: 'mfa',
                timestamp: '2018-11-13T20:20:39+00:00',
                type: 'email',
            },
            {
                name: 'passkey',
                timestamp: '2018-11-13T20:22:13+00:00',
            },
        ],
        riskAssessment: {
            confidence: 'low',
            version: '1',
            assessments: {
                UntrustedIP: {
                    confidence: 'low',
                    code: 'found_on_deny_list',
                    details: {
                        ip: '1.1.1.1',
                        matches: '1.1.1.1/32',
                        source: 'STOPFORUMSPAM-1',
                        category: 'abuse',
                    },
                },
                NewDevice: {
                    confidence: 'low',
                    code: 'no_match',
                    details: {
                        device: 'unknown',
                        useragent: 'unknown',
                    },
                },
                ImpossibleTravel: {
                    confidence: 'low',
                    code: 'impossible_travel_from_last_login',
                },
                AgentDetection: {
                    code: 'verified_agent',
                    confidence: 'neutral',
                    details: {
                        provider: 'openai',
                    },
                },
            },
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
    experiment: {
        experiment_id: 'exp_abc123',
        variation_id: 'var_abc123',
        variation_name: 'Treatment',
        variation_description: 'New login experience',
        config: {
            theme: {
                value: 'dark',
            },
            max_attempts: {
                value: 5,
            },
            feature_enabled: {
                value: true,
            },
        },
        is_control: false,
    },
    organization: {
        display_name: 'My Organization',
        id: 'org_juG7cAQ0CymOcVpV',
        metadata: {},
        name: 'my-organization',
    },
    prompt: {
        id: 'prompt_1234567890',
        vars: {},
        fields: {},
    },
    resource_server: {
        identifier: '{{TENANT}}.auth0.com/api/v2',
    },
    tenant: {
        id: '{{TENANT}}',
    },
    secrets: {},
    session: {
        id: 'sess_123fake',
        device: {
            initial_asn: 'AS13322',
            last_asn: 'AS13335',
            initial_ip: '0.0.0.1',
            last_ip: '0.0.0.0',
            initial_user_agent: 'sample',
            last_user_agent: 'sample',
        },
        user_id: 'auth0|5f7c8ec7c33c6c004bbafe82',
        created_at: '{{DATE}}',
        updated_at: '{{DATE}}',
        authenticated_at: '{{DATE}}',
        idle_expires_at: '{{DATE}}',
        expires_at: '{{DATE}}',
        last_interacted_at: '{{DATE}}',
        clients: [
            {
                client_id: 'gmOWNgklfRm4tyl5YYnl3JDSJy19h1bR',
            },
        ],
        cookie: {
            mode: 'persistent',
        },
        session_transfer: {
            parent_refresh_token: {
                id: 'rt_456parent-fake',
                metadata: {
                    foo: 'bar',
                    fizz: 'buzz',
                },
            },
        },
        metadata: {
            foo: 'bar',
            fizz: 'buzz',
        },
        actor: {
            sub: 'auth0|actor',
        },
    },
    session_transfer_token: {
        client_id: 'gmOWNgklfRm4tyl5YYnl3JDSJy19h1bR',
        scope: ['sample-scope'],
        request: {
            ip: '0.0.0.1',
            asn: 'AS13322',
            user_agent: 'sample-user-agent',
            geoip: {
                cityName: 'Bellevue',
                continentCode: 'NA',
                countryCode3: 'USA',
                countryCode: 'US',
                countryName: 'United States of America',
                latitude: 47.61793,
                longitude: -122.19584,
                subdivisionCode: 'WA',
                subdivisionName: 'Washington',
                timeZone: 'America/Los_Angeles',
            },
        },
    },
    refresh_token: {
        id: 'rt_123fake',
        user_id: 'auth0|5f7c8ec7c33c6c004bbafe82',
        created_at: '{{DATE}}',
        expires_at: '{{DATE}}',
        idle_expires_at: '{{DATE}}',
        client_id: 'gmOWNgklfRm4tyl5YYnl3JDSJy19h1bR',
        session_id: 'sess_123fake',
        rotating: true,
        resource_servers: [
            {
                audience: '{{TENANT}}.auth0.com',
                scopes: 'scope',
            },
        ],
        device: {
            initial_asn: 'AS13322',
            initial_ip: '0.0.0.1',
            initial_user_agent: 'sample-user-agent',
            last_asn: 'AS13335',
            last_ip: '0.0.0.0',
            last_user_agent: 'sample-user-agent',
        },
        last_exchanged_at: '{{DATE}}',
        session_transfer: {
            parent_refresh_token: {
                id: 'rt_456parent-fake',
            },
        },
        metadata: {
            foo: 'bar',
            fizz: 'buzz',
        },
        access: 'offline',
    },
    configuration: {},
    client: {
        authentication: {
            type: 'self_signed_tls_client_auth',
            certificate: {
                raw: '-----BEGIN CERTIFICATE-----\nMIIB...\n-----END CERTIFICATE-----',
                subject: 'CN=client.example.com',
                subjectAltName: 'DNS:client.example.com, IP:127.0.0.1',
                thumbprint256: 'qrvM3e7_ABEiM0RVZneImaq7zN3u_wARIjNEVWZ3iJk',
            },
        },
        client_id: 'gmOWNgklfRm4tyl5YYnl3JDSJy19h1bR',
        external_client_id: 'https://example.com/oauth-client.json',
        name: 'All Applications',
        external_metadata_type: 'cimd',
        metadata: {},
        refresh_token: {
            policies: [
                {
                    audience: 'https://my-test-api',
                    scope: ['read:notes'],
                },
            ],
        },
    },
    request: {
        ip: '13.33.86.47',
        asn: 'AS13335',
        method: 'GET',
        query: {
            protocol: 'oauth2',
            client_id: 'gmOWNgklfRm4tyl5YYnl3JDSJy19h1bR',
            response_type: 'code',
            connection: 'Username-Password-Authentication',
            prompt: 'login',
            scope: 'openid profile',
            redirect_uri: 'https://example/tester/callback?connection=Username-Password-Authentication',
        },
        body: {},
        geoip: {
            cityName: 'Bellevue',
            continentCode: 'NA',
            countryCode3: 'USA',
            countryCode: 'US',
            countryName: 'United States of America',
            latitude: 47.61793,
            longitude: -122.19584,
            subdivisionCode: 'WA',
            subdivisionName: 'Washington',
            timeZone: 'America/Los_Angeles',
        },
        hostname: '{{TENANT}}.auth0.com',
        language: 'en',
        user_agent: 'curl/7.64.1',
    },
    stats: {
        logins_count: 62,
    },
    user: {
        app_metadata: {},
        created_at: '{{DATE}}',
        email_verified: true,
        email: 'j+smith@example.com',
        family_name: 'Smith',
        given_name: 'John',
        identities: [
            {
                connection: 'Username-Password-Authentication',
                isSocial: false,
                provider: 'auth0',
                userId: '5f7c8ec7c33c6c004bbafe82',
                accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gU21pdGgiLCJpYXQiOjE1MTYyMzkwMjJ9.Q_w2AVguPRU2KskCXwR7ZHl09TQXEntfEA8Jj2_Jyew',
                profileData: {},
                user_id: '5f7c8ec7c33c6c004bbafe82',
            },
        ],
        last_password_reset: '{{DATE}}',
        name: 'j+smith@example.com',
        nickname: 'j+smith',
        phone_number: '18882352699',
        phone_verified: false,
        picture: 'http://www.gravatar.com/avatar/?d=identicon',
        updated_at: '{{DATE}}',
        user_id: 'auth0|5f7c8ec7c33c6c004bbafe82',
        user_metadata: {},
        username: 'jsmith',
        multifactor: [],
        enrolledFactors: [],
    },
    security_context: {
        ja3: 'c13a3e168d43e62e0ad96fae6347e2e4',
        ja4: 't13d1516h2_8daaf6152771_02713d6af862',
    },
};

class ValidationAPIImpl {
    #api;
    #triggerAPI;
    constructor(triggerAPI, api) {
        this.#api = api;
        this.#triggerAPI = triggerAPI;
    }
    error(errorCode, errorMessage) {
        index.validate(index.PostLoginValidationErrorInputCodec, { errorCode, errorMessage });
        this.#triggerAPI.validationError(errorCode, errorMessage);
        return this.#api;
    }
}

class AccessAPIImpl {
    #api;
    #triggerAPI;
    constructor(triggerAPI, api) {
        this.#api = api;
        this.#triggerAPI = triggerAPI;
    }
    deny(reason) {
        this.#triggerAPI.denyAccess(reason);
        return this.#api;
    }
}

class AccessTokenAPIImpl {
    #api;
    #triggerAPI;
    constructor(triggerAPI, api) {
        this.#api = api;
        this.#triggerAPI = triggerAPI;
    }
    setCustomClaim(key, value) {
        index.helpers.customClaim.assertSettableCustomClaim(key);
        this.#triggerAPI.setCustomClaim('accessToken', key, value);
        return this.#api;
    }
    addScope(scope) {
        const modifyScope = index.helpers.accessToken.addScope(scope);
        this.#triggerAPI.modifyScope(modifyScope.target, modifyScope.modifications);
    }
    removeScope(scope) {
        const modifyScope = index.helpers.accessToken.removeScope(scope);
        this.#triggerAPI.modifyScope(modifyScope.target, modifyScope.modifications);
    }
}

class AuthenticationAPIImpl {
    #api;
    #triggerAPI;
    constructor(triggerAPI, api) {
        this.#api = api;
        this.#triggerAPI = triggerAPI;
    }
    enrollWith(factor, options) {
        this.#triggerAPI.enrollWith(factor, options);
    }
    enrollWithAny(factors) {
        this.#triggerAPI.enrollWithAny(factors);
    }
    challengeWithAny(factors) {
        this.#triggerAPI.challengeWithAny(factors);
    }
    challengeWith(factor, options) {
        this.#triggerAPI.challengeWith(factor, options);
    }
    recordMethod(provider_url) {
        this.#triggerAPI.recordMethod(provider_url);
        return this.#api;
    }
    setPrimaryUser(primary_user_id) {
        // We only want to allow for a single primaryUser change per execution
        // across both Rules and Actions. We do a preliminary check here, but
        // validation of this limit ultimately needs to be done in auth0-server.
        if (this.#triggerAPI.hasSetPrimaryUser()) {
            throw new Error('The primary user can only be altered once per transaction');
        }
        if (typeof primary_user_id !== 'string' || primary_user_id.length === 0) {
            throw new Error('The provided primary_user_id must be a non-empty string');
        }
        if (primary_user_id.length > index.MAX_USER_ID_LENGTH) {
            throw new Error('The provided primary_user_id exceeds the maximum length.');
        }
        this.#triggerAPI.setPrimaryUser(primary_user_id);
    }
}

class GroupsAPIImpl {
    #triggerAPI;
    #event;
    constructor(triggerAPI, event) {
        this.#triggerAPI = triggerAPI;
        this.#event = event;
    }
    async getUserGroups({ from, take } = {}) {
        if (from !== undefined && typeof from !== 'string') {
            throw new Error('The "from" parameter must be a string if provided.');
        }
        if (take !== undefined && (typeof take !== 'number' || !Number.isInteger(take) || take <= 0)) {
            throw new Error('The "take" parameter must be a positive integer if provided.');
        }
        return this.#triggerAPI.getUserGroups(this.#event.user.user_id, { from, take });
    }
    async hasGroupMembership(groups) {
        if (!groups || !Array.isArray(groups) || !groups.length) {
            throw new Error('The "groups" parameter must be a non-empty array of strings.');
        }
        return this.#triggerAPI.hasGroupMembership(this.#event.user.user_id, this.#event.connection?.id, this.#event.organization?.id, groups);
    }
}

class IdTokenAPIImpl {
    #api;
    #triggerAPI;
    constructor(triggerAPI, api) {
        this.#api = api;
        this.#triggerAPI = triggerAPI;
    }
    setCustomClaim(key, value) {
        index.helpers.customClaim.assertSettableCustomClaim(key);
        this.#triggerAPI.setCustomClaim('idToken', key, value);
        return this.#api;
    }
}

class MultifactorAPIImpl {
    #api;
    #triggerAPI;
    constructor(triggerAPI, api) {
        this.#api = api;
        this.#triggerAPI = triggerAPI;
    }
    enable(provider, options) {
        this.#triggerAPI.requireMultifactorAuth(provider, {
            allowRememberBrowser: options?.allowRememberBrowser,
            providerOptions: options?.providerOptions,
        });
        return this.#api;
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
        index.validate(index.PostLoginRenderPromptInputCodec, {
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
const NO_REDIRECT_PROTOCOLS = [
    'oauth2-resource-owner',
    'oauth2-refresh-token',
    'oauth2-password',
    'oauth2-webauthn',
];
class RedirectAPIImpl {
    #getContinueParams = (request) => {
        const queryParams = (request && request.query) || {};
        const bodyParams = (request && request.body) || {};
        return {
            ...queryParams,
            ...bodyParams,
        };
    };
    #api;
    #triggerAPI;
    #event;
    constructor(triggerAPI, api, event) {
        this.#api = api;
        this.#triggerAPI = triggerAPI;
        this.#event = event;
    }
    encodeToken(options) {
        const issuedAt = Math.floor(Date.now() / 1000);
        const payload = {
            iat: issuedAt,
            iss: this.#event.request.hostname,
            sub: this.#event.user.user_id,
            exp: issuedAt + (options.expiresInSeconds ?? DEFAULT_SESSION_TOKEN_EXP),
            ip: this.#event.request.ip,
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
            return this.#api;
        }
        const url$1 = new url.URL(baseUrl);
        if (urlOptions?.query) {
            for (const param in urlOptions.query) {
                url$1.searchParams.set(param, urlOptions.query[param]);
            }
        }
        this.#triggerAPI.sendUserTo(url$1.href);
        return this.#api;
    }
    canRedirect() {
        const queryParams = this.#event?.request?.query ?? {};
        // If prompt is none, this will throw an interaction needed error.
        if (queryParams.prompt === 'none') {
            return false;
        }
        return !NO_REDIRECT_PROTOCOLS.includes((this.#event.transaction && this.#event.transaction.protocol) || 'unknown-protocol');
    }
    validateToken(options) {
        options.tokenParameterName ||= DEFAULT_SESSION_TOKEN_QUERY_PARAM;
        const params = this.#getContinueParams(this.#event.request);
        const token = params[options.tokenParameterName];
        if (!token) {
            throw new Error(`There is no parameter called '${options.tokenParameterName}' available in either the POST body or query string.`);
        }
        const response = this.#triggerAPI.validateToken({
            token: token,
            secret: options.secret,
            issuer: this.#event.request.hostname,
            expectedState: params.state,
            expectedSub: this.#event.user.user_id,
        });
        if (!response.valid) {
            throw new Error(`The session token is invalid: ${response.reason}`);
        }
        return response.payload;
    }
}

// This file is copied from auth0-sessions-lib due to restrictions in package installation
// Please make sure to keep it in sync with the original file while a permanent solution is found
// Note that some modifications exist due to typing
// In auth0-sessions-lib see: https://github.com/atko-cic/auth0-sessions-lib//tree/master/src/sessions/validators/ServerSessionValidator.ts
class RefreshTokenValidator {
    MAX_METADATA_KEY_LENGTH = 255;
    MAX_METADATA_VALUE_LENGTH = 255;
    MAX_METADATA_KEY_COUNT = 25;
    METADATA_KEY_REGEX = new RegExp(`^[a-zA-Z0-9_-]{1,${this.MAX_METADATA_KEY_LENGTH}}$`);
    constructor() { }
    validateMetadata(metadata) {
        if (metadata === null || metadata === undefined) {
            return { valid: true };
        }
        // Type validation
        if (typeof metadata !== 'object' || Array.isArray(metadata)) {
            return { valid: false, error: 'Metadata must be an object' };
        }
        // Key count validation
        if (Object.entries(metadata).length > this.MAX_METADATA_KEY_COUNT) {
            return { valid: false, error: 'Metadata must not contain more than 25 entries' };
        }
        for (const [key, value] of Object.entries(metadata)) {
            // Key length validation
            if (key.length > this.MAX_METADATA_KEY_LENGTH) {
                return {
                    valid: false,
                    error: `All metadata keys must be at most ${this.MAX_METADATA_KEY_LENGTH} characters long`,
                };
            }
            // Key null byte validation
            if (key.includes('\x00')) {
                return {
                    valid: false,
                    error: 'Metadata keys must not contain null bytes (\x00)',
                };
            }
            // Key character validation
            if (!this.METADATA_KEY_REGEX.test(key)) {
                return {
                    valid: false,
                    error: 'Metadata keys may only include letters, numbers, underscores, or hyphens',
                };
            }
            // Value length validation
            if (value.length > this.MAX_METADATA_VALUE_LENGTH) {
                return {
                    valid: false,
                    error: `All metadata values must be at most ${this.MAX_METADATA_VALUE_LENGTH} characters long`,
                };
            }
            // Value null byte validation
            if (value.includes('\x00')) {
                return {
                    valid: false,
                    error: 'Metadata values must not contain null bytes (\x00)',
                };
            }
        }
        return { valid: true };
    }
}

class RefreshTokenAPIImpl {
    #triggerAPI;
    #event;
    #refreshTokenMetadata;
    #refreshTokenMetadataValidator;
    /**
     * Initialises a new instance of the class.
     * @param triggerAPI The trigger API used to process the commands.
     * @param event The event object.
     */
    constructor(triggerAPI, event) {
        this.#triggerAPI = triggerAPI;
        this.#event = event;
        this.#refreshTokenMetadataValidator = new RefreshTokenValidator();
        // unlike session, refresh token metadata operations ARE allowed without a refresh token (even if event.refresh_token is undefined)
        // because metadata can be added before the refresh token is created
        if (this.#event.refresh_token?.metadata) {
            this.#refreshTokenMetadata = handler.deepClone(this.#event.refresh_token.metadata);
        }
        else {
            this.#refreshTokenMetadata = {};
        }
    }
    /**
     * @param method The name of the method being called, used in the error message.
     */
    #throwIfOnlineRefreshToken(method) {
        if (this.#event.refresh_token?.access === 'online') {
            throw new Error(`Cannot call ${method} on an online refresh token.`);
        }
    }
    /**
     * Sets the new absolute expiration for the underlying entity.
     *
     * @param absolute Required, the new absolute expiration time after which the entity will be considered invalid.
     */
    setExpiresAt(absolute) {
        this.#throwIfOnlineRefreshToken('setExpiresAt');
        if (!absolute) {
            throw new Error('Either inactivity or absolute expiration time must be provided');
        }
        index.validate(index.PostLoginSetRefreshTokenExpirationInputCodec, { absolute });
        this.#triggerAPI.setRefreshTokenExpiration(undefined, absolute);
    }
    /**
     * Sets the new inactivity expiration for the underlying entity.
     *
     * @param inactivity Required, the new inactivity expiration time after which the entity will be considered invalid
     * if there is no user interaction during this period.
     */
    setIdleExpiresAt(inactivity) {
        this.#throwIfOnlineRefreshToken('setIdleExpiresAt');
        if (!inactivity) {
            throw new Error('Either inactivity or absolute expiration time must be provided');
        }
        index.validate(index.PostLoginSetRefreshTokenExpirationInputCodec, { inactivity });
        this.#triggerAPI.setRefreshTokenExpiration(inactivity, undefined);
    }
    revoke(reason) {
        index.validate(index.PostLoginRevokeRefreshTokenInputCodec, { message: reason });
        this.#triggerAPI.revokeRefreshToken(reason);
    }
    setMetadata(key, value) {
        try {
            this.#throwIfOnlineRefreshToken('setMetadata');
            if (!this.#refreshTokenMetadata) {
                throw new Error('Cannot set metadata on a refresh token that does not exist.');
            }
            if (typeof key !== 'string') {
                throw new Error('Invalid metadata: Metadata key must be a string');
            }
            // Deletion path
            if (value === null) {
                if (!(key in this.#refreshTokenMetadata)) {
                    return; // Key does not exist, nothing to delete
                }
                delete this.#refreshTokenMetadata[key];
                // Continue validation / setting value
            }
            else {
                if (typeof value !== 'string') {
                    throw new Error('Invalid metadata: Metadata value must be a string');
                }
                this.#refreshTokenMetadata[key] = value;
                const validationResult = this.#refreshTokenMetadataValidator.validateMetadata(this.#refreshTokenMetadata);
                if (!validationResult.valid) {
                    throw new Error(`Invalid metadata: ${validationResult.error}`);
                }
            }
            // Only update event.refresh_token.metadata if a refresh token already
            // exists in the transaction. Creating event.refresh_token when it is
            // undefined would cause downstream Actions checking
            // `if (event.refresh_token)` to incorrectly believe a refresh token
            // is present.
            if (this.#event.refresh_token) {
                this.#event.refresh_token.metadata = handler.deepClone(this.#refreshTokenMetadata);
            }
            // Always emit the command so metadata is persisted for when a refresh
            // token is eventually created by the auth pipeline.
            this.#triggerAPI.setRefreshTokenMetadata(this.#refreshTokenMetadata);
        }
        catch (e) {
            const message = e instanceof Error ? e.message : String(e);
            throw new Error(`Failed to set refresh token metadata: ${message}`);
        }
    }
    deleteMetadata(key) {
        this.#throwIfOnlineRefreshToken('deleteMetadata');
        if (!this.#refreshTokenMetadata || Object.keys(this.#refreshTokenMetadata).length === 0) {
            return;
        }
        if (key in this.#refreshTokenMetadata) {
            delete this.#refreshTokenMetadata[key];
            if (this.#event.refresh_token) {
                this.#event.refresh_token.metadata = handler.deepClone(this.#refreshTokenMetadata);
            }
            this.#triggerAPI.setRefreshTokenMetadata(this.#refreshTokenMetadata);
        }
    }
    evictMetadata() {
        this.#throwIfOnlineRefreshToken('evictMetadata');
        if (!this.#refreshTokenMetadata || Object.keys(this.#refreshTokenMetadata).length === 0) {
            return;
        }
        this.#refreshTokenMetadata = {};
        if (this.#event.refresh_token) {
            this.#event.refresh_token.metadata = {};
        }
        this.#triggerAPI.setRefreshTokenMetadata({});
    }
}

class RolesAPIImpl {
    #triggerAPI;
    #event;
    constructor(triggerAPI, event) {
        this.#triggerAPI = triggerAPI;
        this.#event = event;
    }
    async getUserEffectiveRoles({ from, take, } = {}) {
        if (from !== undefined && typeof from !== 'string') {
            throw new Error('The "from" parameter must be a string if provided.');
        }
        if (take !== undefined && (typeof take !== 'number' || !Number.isInteger(take) || take <= 0)) {
            throw new Error('The "take" parameter must be a positive integer if provided.');
        }
        return this.#triggerAPI.getUserEffectiveRoles(this.#event.user.user_id, this.#event.organization?.id, { from, take });
    }
    async getUserEffectiveRolesByIds(ids) {
        if (!ids || !Array.isArray(ids) || !ids.length) {
            throw new Error('The "ids" parameter must be a non-empty array of strings.');
        }
        return this.#triggerAPI.getUserEffectiveRolesByIds(this.#event.user.user_id, this.#event.organization?.id, ids);
    }
    async getUserEffectiveRolesByNames(names) {
        if (!names || !Array.isArray(names) || !names.length) {
            throw new Error('The "names" parameter must be a non-empty array of strings.');
        }
        return this.#triggerAPI.getUserEffectiveRolesByNames(this.#event.user.user_id, this.#event.organization?.id, names);
    }
}

class RulesAPIImpl {
    #context;
    constructor(context) {
        this.#context = context;
    }
    wasExecuted(ruleId) {
        return this.#context?.includes(ruleId) || false;
    }
}

class SAMLResponseAPIImpl {
    #api;
    #triggerAPI;
    constructor(triggerAPI, api) {
        this.#api = api;
        this.#triggerAPI = triggerAPI;
    }
    setAttribute(attribute, value) {
        // Resolves to true for both 'null' and 'undefined' but normalizes to 'null'.
        // Allows developer flexibility to use either in the SAML API.
        value ??= null;
        // Early validation of the serialized SAML attribute object size before validation by auth0-server
        const samlAttributes = this.#triggerAPI.getSAMLAttributes();
        samlAttributes[attribute] = value;
        if (Buffer.byteLength(JSON.stringify(samlAttributes)) > index.MAX_SAML_BYTES) {
            throw new Error(`The total size of the SAML attributes exceeds the limit of ${index.MAX_SAML_BYTES} bytes.`);
        }
        index.validate(index.PostLoginSetSAMLAttributeInputCodec, {
            attribute,
            value,
        });
        this.#triggerAPI.setSAMLAttribute(attribute, value);
        return this.#api;
    }
    setAudience(audience) {
        return this.#setConfig('audience', audience);
    }
    setRecipient(recipient) {
        return this.#setConfig('recipient', recipient);
    }
    setCreateUpnClaim(createUpnClaim) {
        return this.#setConfig('createUpnClaim', createUpnClaim);
    }
    setPassthroughClaimsWithNoMapping(passthroughClaimsWithNoMapping) {
        return this.#setConfig('passthroughClaimsWithNoMapping', passthroughClaimsWithNoMapping);
    }
    setMapUnknownClaimsAsIs(mapUnknownClaimsAsIs) {
        return this.#setConfig('mapUnknownClaimsAsIs', mapUnknownClaimsAsIs);
    }
    setMapIdentities(mapIdentities) {
        return this.#setConfig('mapIdentities', mapIdentities);
    }
    setSignatureAlgorithm(signatureAlgorithm) {
        return this.#setConfig('signatureAlgorithm', signatureAlgorithm);
    }
    setDigestAlgorithm(digestAlgorithm) {
        return this.#setConfig('digestAlgorithm', digestAlgorithm);
    }
    setDestination(destination) {
        return this.#setConfig('destination', destination);
    }
    setLifetimeInSeconds(lifetimeInSeconds) {
        return this.#setConfig('lifetimeInSeconds', lifetimeInSeconds);
    }
    setSignResponse(signResponse) {
        return this.#setConfig('signResponse', signResponse);
    }
    setNameIdentifierFormat(nameIdentifierFormat = 'urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified') {
        return this.#setConfig('nameIdentifierFormat', nameIdentifierFormat);
    }
    setNameIdentifierProbes(nameIdentifierProbes) {
        return this.#setConfig('nameIdentifierProbes', nameIdentifierProbes);
    }
    setAuthnContextClassRef(authnContextClassRef) {
        return this.#setConfig('authnContextClassRef', authnContextClassRef);
    }
    setSigningCert(signingCert) {
        return this.#setConfig('signingCert', signingCert);
    }
    setIncludeAttributeNameFormat(includeAttributeNameFormat) {
        return this.#setConfig('includeAttributeNameFormat', includeAttributeNameFormat);
    }
    setTypedAttributes(typedAttributes) {
        return this.#setConfig('typedAttributes', typedAttributes);
    }
    setEncryptionCert(encryptionCert) {
        return this.#setConfig('encryptionCert', encryptionCert);
    }
    setEncryptionPublicKey(encryptionPublicKey) {
        return this.#setConfig('encryptionPublicKey', encryptionPublicKey);
    }
    setCert(cert) {
        return this.#setConfig('cert', cert);
    }
    setKey(key) {
        return this.#setConfig('key', key);
    }
    setRelayState(relayState) {
        return this.#setConfig('RelayState', relayState);
    }
    setIssuer(issuer) {
        return this.#setConfig('issuer', issuer);
    }
    setEncryptionAlgorithm(encryptionAlgorithm) {
        return this.#setConfig('encryptionAlgorithm', encryptionAlgorithm);
    }
    #setConfig = (key, value) => {
        // If the validator returns an error code, we throw an error here.
        // This will cause the execution to fail and other commands from actions to be discarded.
        // We believe that if the customer wants to set a configuration, it may be critical to their
        // usecase. Silently discarding that configuration in service of avoiding breaking their logins
        // would go against their intent and could potentially lead to security vulnerabilities.
        const configs = { [key]: value };
        index.validate(index.PostLoginSetSAMLConfigurationInputCodec, configs);
        this.#triggerAPI.setSAMLConfiguration(configs);
        return this.#api;
    };
}

// This file is copied from auth0-sessions-lib due to restrictions in package installation
// Please make sure to keep it in sync with the original file while a permanent solution is found
// Note that some modifications exist due to typing
// In auth0-sessions-lib see: https://github.com/atko-cic/auth0-sessions-lib//tree/master/src/sessions/validators/ServerSessionValidator.ts
class ServerSessionValidator {
    MAX_METADATA_KEY_LENGTH = 255;
    MAX_METADATA_VALUE_LENGTH = 255;
    MAX_METADATA_KEY_COUNT = 25;
    METADATA_KEY_REGEX = new RegExp(`^[a-zA-Z0-9_-]{1,${this.MAX_METADATA_KEY_LENGTH}}$`);
    constructor() { }
    validateMetadata(metadata) {
        if (metadata === null || metadata === undefined) {
            return { valid: true };
        }
        // Type validation
        if (typeof metadata !== 'object' || Array.isArray(metadata)) {
            return { valid: false, error: 'Metadata must be an object' };
        }
        // Key count validation
        if (Object.entries(metadata).length > this.MAX_METADATA_KEY_COUNT) {
            return { valid: false, error: 'Metadata must not contain more than 25 entries' };
        }
        for (const [key, value] of Object.entries(metadata)) {
            // Key length validation
            if (key.length > this.MAX_METADATA_KEY_LENGTH) {
                return {
                    valid: false,
                    error: `All metadata keys must be at most ${this.MAX_METADATA_KEY_LENGTH} characters long`,
                };
            }
            // Key null byte validation
            if (key.includes('\x00')) {
                return {
                    valid: false,
                    error: 'Metadata keys must not contain null bytes (\x00)',
                };
            }
            // Key character validation
            if (!this.METADATA_KEY_REGEX.test(key)) {
                return {
                    valid: false,
                    error: 'Metadata keys may only include letters, numbers, underscores, or hyphens',
                };
            }
            // Value length validation
            if (value.length > this.MAX_METADATA_VALUE_LENGTH) {
                return {
                    valid: false,
                    error: `All metadata values must be at most ${this.MAX_METADATA_VALUE_LENGTH} characters long`,
                };
            }
            // Value null byte validation
            if (value.includes('\x00')) {
                return {
                    valid: false,
                    error: 'Metadata values must not contain null bytes (\x00)',
                };
            }
        }
        return { valid: true };
    }
}

class SessionAPIImpl {
    #triggerAPI;
    #event;
    #sessionMetadata;
    #sessionMetadataValidator;
    /**
     * Initialises a new instance of the class.
     * @param triggerAPI The trigger API used to process the commands.
     * @param event The event object.
     */
    constructor(triggerAPI, event) {
        this.#triggerAPI = triggerAPI;
        this.#event = event;
        this.#sessionMetadataValidator = new ServerSessionValidator();
        // unlike refreshToken, session metadata operations should not
        // be allowed without an active session (no event.session)
        if (this.#event.session) {
            this.#sessionMetadata = this.#event.session.metadata
                ? handler.deepClone(this.#event.session.metadata)
                : {};
        }
    }
    /**
     * Sets the new absolute expiration for the underlying entity.
     *
     * @param absolute Required, the new absolute expiration time after which the entity will be considered invalid.
     */
    setExpiresAt(absolute) {
        if (!absolute) {
            throw new Error('Either inactivity or absolute expiration time must be provided');
        }
        index.validate(index.PostLoginSetSessionExpirationInputCodec, { absolute });
        this.#triggerAPI.setSessionExpiration(undefined, absolute);
    }
    /**
     * Sets the new inactivity expiration for the underlying entity.
     *
     * @param inactivity Required, the new inactivity expiration time after which the entity will be considered invalid
     * if there is no user interaction during this period.
     */
    setIdleExpiresAt(inactivity) {
        if (!inactivity) {
            throw new Error('Either inactivity or absolute expiration time must be provided');
        }
        index.validate(index.PostLoginSetSessionExpirationInputCodec, { inactivity });
        this.#triggerAPI.setSessionExpiration(inactivity, undefined);
    }
    revoke(reason, options) {
        index.validate(index.PostLoginRevokeSessionInputCodec, { message: reason, options });
        this.#triggerAPI.revokeSession(reason, options);
    }
    /**
     * [Enterprise Customers] [Early Access] Sets the cookie mode for the current session, allowing it to be either 'persistent' or 'non-persistent' (ephemeral).
     * This determines how the session cookie is handled in the browser:
     * - 'persistent': The cookie will be stored until it expires or is deleted by the user.
     * - 'non-persistent' (ephemeral): The cookie will be deleted when the browser is closed.
     *
     * If multiple setCookieMode invocations are made, only the last one will take effect. In case 'non-persistent' is set, the cookie will be deleted when the browser is closed, however, the session itself will remain valid until its absolute or idle expiration time is reached
     * or the session is revoked through our available APIs. For more information on cookie modes, please refer to our documentation.
     *
     * @param mode Required, the cookie mode for the current session.
     * Can be either 'persistent' or 'non-persistent' (ephemeral).
     */
    setCookieMode(mode) {
        if (!mode) {
            throw new Error('Cookie mode must be provided');
        }
        if (!['persistent', 'non-persistent'].includes(mode)) {
            throw new Error(`Invalid cookie mode: ${mode}. Valid values are 'persistent' and 'non-persistent'.`);
        }
        index.validate(index.PostLoginSetCookieModeInputCodec, { mode });
        this.#triggerAPI.setCookieMode(mode);
        // Ensure we just apply the side effect if the session exists.
        // We need to check if the session is not empty due to ongoing deprecation of
        // cases where the session is not present in the flow but exposed as empty object.
        if (this.#event.session &&
            typeof this.#event.session === 'object' &&
            Object.keys(this.#event.session).length > 0) {
            const session = this.#event.session;
            this.#event.session = {
                ...session,
                cookie: {
                    ...session?.cookie,
                    mode: mode,
                },
            };
        }
    }
    setMetadata(key, value) {
        try {
            if (!this.#event.session || !this.#sessionMetadata) {
                throw new Error('Cannot set metadata on a session that does not exist.');
            }
            if (typeof key !== 'string') {
                throw new Error('Invalid metadata: Metadata key must be a string');
            }
            // Deletion path
            if (value === null) {
                if (!(key in this.#sessionMetadata)) {
                    return; // Key does not exist, nothing to delete
                }
                delete this.#sessionMetadata[key];
                // Continue validation / setting value
            }
            else {
                if (typeof value !== 'string') {
                    throw new Error('Invalid metadata: Metadata value must be a string');
                }
                this.#sessionMetadata[key] = value;
                const validationResult = this.#sessionMetadataValidator.validateMetadata(this.#sessionMetadata);
                if (!validationResult.valid) {
                    throw new Error(`Invalid metadata: ${validationResult.error}`);
                }
            }
            this.#event.session.metadata = handler.deepClone(this.#sessionMetadata);
            this.#triggerAPI.setSessionMetadata(this.#sessionMetadata);
        }
        catch (e) {
            const message = e instanceof Error ? e.message : String(e);
            throw new Error(`Failed to set session metadata: ${message}`);
        }
    }
    deleteMetadata(key) {
        if (!this.#event.session || !this.#sessionMetadata) {
            return;
        }
        if (key in this.#sessionMetadata) {
            delete this.#sessionMetadata[key];
            this.#event.session.metadata = handler.deepClone(this.#sessionMetadata);
            this.#triggerAPI.setSessionMetadata(this.#sessionMetadata);
        }
    }
    evictMetadata() {
        if (!this.#event.session || !this.#sessionMetadata) {
            return;
        }
        this.#sessionMetadata = {};
        this.#event.session.metadata = {};
        this.#triggerAPI.setSessionMetadata({});
    }
}

/** Feature flag gating access to the transaction target scopes API. */
const TRANSACTION_TARGET_SCOPES_FLAG = 'actions_pl_transaction_target_scopes';
class TransactionAPIImpl {
    #metadataAPI;
    #targetScopesAPI;
    #event;
    #featureFlags;
    constructor(triggerAPI, event, featureFlags) {
        this.#metadataAPI = triggerAPI.getTransactionMetadataAPI();
        this.#targetScopesAPI = triggerAPI.getTargetScopesAPI();
        this.#event = event;
        this.#featureFlags = featureFlags;
    }
    setMetadata(key, value) {
        this.#metadataAPI.setMetadata(key, value);
        this.#ensureTransaction().metadata = this.#metadataAPI.getMetadata();
    }
    addTargetScope(scope) {
        this.#assertFeatureEnabled();
        this.#targetScopesAPI.addTargetScope(scope);
        this.#syncEventTargetScopes();
    }
    removeTargetScope(scope) {
        this.#assertFeatureEnabled();
        this.#targetScopesAPI.removeTargetScope(scope);
        this.#syncEventTargetScopes();
    }
    setTargetScopes(scopes) {
        this.#assertFeatureEnabled();
        this.#targetScopesAPI.setTargetScopes(scopes);
        this.#syncEventTargetScopes();
    }
    clearTargetScopes() {
        this.#assertFeatureEnabled();
        this.#targetScopesAPI.clearTargetScopes();
        this.#syncEventTargetScopes();
    }
    // `event.transaction` is optional on the Post Login event, so it may need to be
    // created before it can be mutated.
    #ensureTransaction() {
        if (!this.#event.transaction) {
            this.#event.transaction = {};
        }
        return this.#event.transaction;
    }
    // Mirror the scope set onto the event so subsequent reads within the same
    // Action observe the change. Only ever reached once the gating feature flag
    // has been asserted, so this needs no gate of its own.
    #syncEventTargetScopes() {
        this.#ensureTransaction().target_scopes = this.#targetScopesAPI.getTargetScopes();
    }
    // Prevent the internal transaction target scopes API from being executed when
    // the gating feature flag is disabled. Remove this guard at GA.
    #assertFeatureEnabled() {
        if (this.#featureFlags[TRANSACTION_TARGET_SCOPES_FLAG] !== true) {
            throw new Error('Method not implemented.');
        }
    }
}

class UserAPIImpl {
    #api;
    #triggerAPI;
    #event;
    constructor(triggerAPI, api, event) {
        this.#api = api;
        this.#triggerAPI = triggerAPI;
        this.#event = event;
    }
    setAppMetadata(key, value) {
        // Guard against situations where the persisted user's metadata is NOT already
        // an object. This type is not enforced in some scenarios like CustomDB where a developer
        // can return anything in the app_metadata field.
        if (!metadata.isObject(this.#event.user.app_metadata)) {
            throw new Error('Unexpected app_metadata format. Must be a valid JSON object');
        }
        this.#triggerAPI.setMetadata('application', key, value);
        return this.#api;
    }
    setUserMetadata(key, value) {
        // Guard against situations where the persisted user's metadata is NOT already
        // an object. This type is not enforced in some scenarios like CustomDB where a developer
        // can return anything in the user_metadata field.
        if (!metadata.isObject(this.#event.user.user_metadata)) {
            throw new Error('Unexpected user_metadata format. Must be a valid JSON object.');
        }
        this.#triggerAPI.setMetadata('user', key, value);
        return this.#api;
    }
}

class PostLoginAPIImpl {
    access;
    accessToken;
    authentication;
    cache;
    groups;
    roles;
    idToken;
    multifactor;
    prompt;
    refreshToken;
    session;
    redirect;
    samlResponse;
    user;
    validation;
    rules;
    transaction;
    constructor(event, triggerAPI, rulesContext, featureFlags) {
        this.access = new AccessAPIImpl(triggerAPI, this);
        this.accessToken = new AccessTokenAPIImpl(triggerAPI, this);
        this.authentication = new AuthenticationAPIImpl(triggerAPI, this);
        this.cache = triggerAPI.getCacheAPI();
        this.groups = new GroupsAPIImpl(triggerAPI, event);
        this.roles = new RolesAPIImpl(triggerAPI, event);
        this.idToken = new IdTokenAPIImpl(triggerAPI, this);
        this.multifactor = new MultifactorAPIImpl(triggerAPI, this);
        this.prompt = new PromptAPIImpl(triggerAPI);
        this.refreshToken = new RefreshTokenAPIImpl(triggerAPI, event);
        this.session = new SessionAPIImpl(triggerAPI, event);
        this.redirect = new RedirectAPIImpl(triggerAPI, this, event);
        this.samlResponse = new SAMLResponseAPIImpl(triggerAPI, this);
        this.user = new UserAPIImpl(triggerAPI, this, event);
        this.validation = new ValidationAPIImpl(triggerAPI, this);
        this.rules = new RulesAPIImpl(rulesContext);
        this.transaction = new TransactionAPIImpl(triggerAPI, event, featureFlags);
    }
}

function contextToArguments(context) {
    return [
        context.event,
        new PostLoginAPIImpl(context.event, context.triggerAPI, context.rules, context.featureFlags),
    ];
}
const getHandler = handler.getHandlerFactory([
    'onExecutePostLogin',
    'onContinuePostLogin',
]);

/**
 * Builds `contextToArguments` input for tests: a fresh clone of the example event paired with a stubbed
 * {@link PostLoginTriggerAPI} and rules context. The event is cloned per call so mutations in one
 * execution don't leak into the next.
 */
function getDefaultArguments() {
    const event$1 = handler.deepClone(event);
    const context = {
        event: event$1,
        triggerAPI: new PostLoginTriggerAPIStubImpl([...(event$1.transaction?.target_scopes ?? [])]),
        rules: [],
        featureFlags: {},
    };
    return contextToArguments(context);
}
/** Loads a PostLogin v3 action file for use in tests, e.g. `action.execute('onExecutePostLogin', event, api)`. */
const loadAction = handler.createLoader(getHandler);

exports.getDefaultArguments = getDefaultArguments;
exports.loadAction = loadAction;
