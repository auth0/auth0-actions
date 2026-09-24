'use strict';

var handler = require('../../../_shared/_XK5Fidc.js');
var index = require('../../../_shared/BBcRtdsL.js');
require('node:vm');
require('async_hooks');
require('console');
require('stream');
require('node:fs/promises');
require('node:module');

/**
 * No-op {@link PreUserRegistrationTriggerAPI} for use in mock API implementations.
 */
class PreUserRegistrationTriggerAPIStubImpl {
    #cacheAPI = handler.createNoopCacheAPI();
    getCacheAPI() {
        return this.#cacheAPI;
    }
    denyAccess(_reason, _userMessage) { }
    setAppMetadata(_key, _value) { }
    setUserMetadata(_key, _value) { }
    setUserId(_user_id) { }
    validationError(_errorCode, _errorMessage) { }
}

const event = {
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
        riskAssessment: {
            supplemental: {
                akamai: {
                    akamaiBot: {
                        type: 'Akamai-Categorized Bot',
                        action: 'Monitor',
                        botCategory: ['Web Search Engine Bots', 'Search Engine Bots'],
                        botScore: 0,
                        botScoreResponseSegment: 'test',
                        botnetId: 'googlebot',
                    },
                    akamaiUserRisk: {
                        action: 'monitor',
                        allow: 0,
                        emailDomain: 'example.com',
                        general: {
                            aci: '0',
                            db: 'Chrome 85',
                            di: '0fc91b5ec42f5a471c16a85e3e388ca57697c1a9',
                            do: 'Mac OS X 10',
                        },
                        ouid: 'm534264',
                        requestid: '19e22e',
                        risk: {
                            ugp: 'ie/M',
                            unp: '432/H',
                        },
                        score: 0,
                        status: 4,
                        trust: {
                            udbp: 'Chrome85',
                            udfp: '25ba44ec3b391ba4ce5fbbd2979635e254775e7d',
                            udop: 'Mac OS X 10',
                            ugp: 'FR',
                            unp: '12322',
                            utp: 'weekday_3',
                        },
                        username: 'testuser@example.com',
                        uuid: '86b37525-8047-4a3c-8d7a-23e99901da05',
                    },
                },
            },
        },
    },
    request: {
        method: 'POST',
        ip: '13.33.86.47',
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
        hostname: '{{TENANT}}.example.com',
        language: 'en',
        user_agent: 'curl/7.64.1',
        body: {
            'ulp-custom-field': 'UlpCustomField',
        },
    },
    transaction: {
        acr_values: [],
        correlation_id: '1234567890',
        locale: 'en',
        requested_scopes: [],
        ui_locales: ['en'],
        protocol: 'oidc-basic-profile',
    },
    connection: {
        id: 'con_fpe5kj482KO1eOzQ',
        strategy: 'stragegy',
        name: 'Username-Password-Authentication',
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
    tenant: {
        id: '{{TENANT}}',
    },
    configuration: {},
    secrets: {},
    client: {
        client_id: 'gmOWNgklfRm4tyl5YYnl3JDSJy19h1bR',
        external_client_id: 'https://example.com/oauth-client.json',
        metadata: {},
        name: 'All Applications',
        external_metadata_type: 'cimd',
    },
    user: {
        app_metadata: {},
        email: 'j+smith@example.com',
        family_name: 'Smith',
        given_name: 'John',
        name: 'John Smith',
        nickname: 'j+smith',
        picture: 'http://www.gravatar.com/avatar/?d=identicon',
        user_metadata: {},
        username: 'j+smith',
        phone_number: '123-123-1234',
    },
    security_context: {
        ja3: 'c13a3e168d43e62e0ad96fae6347e2e4',
        ja4: 't13d1516h2_8daaf6152771_02713d6af862',
    },
};

class AccessAPIImpl {
    #api;
    #triggerAPI;
    constructor(triggerAPI, api) {
        this.#api = api;
        this.#triggerAPI = triggerAPI;
    }
    deny(reason, userMessage) {
        this.#triggerAPI.denyAccess(reason, userMessage);
        return this.#api;
    }
}
class ValidationAPIImpl {
    #api;
    #triggerAPI;
    constructor(triggerAPI, api) {
        this.#api = api;
        this.#triggerAPI = triggerAPI;
    }
    error(errorCode, errorMessage) {
        index.validate(index.PreUserRegistrationValidationErrorInputCodec, { errorCode, errorMessage }, 'Failed to add validation error');
        this.#triggerAPI.validationError(errorCode, errorMessage);
        return this.#api;
    }
}
class UserAPIImpl {
    #api;
    #triggerAPI;
    constructor(triggerAPI, api) {
        this.#api = api;
        this.#triggerAPI = triggerAPI;
    }
    setAppMetadata(key, value) {
        this.#triggerAPI.setAppMetadata(key, value);
        return this.#api;
    }
    setUserMetadata(key, value) {
        this.#triggerAPI.setUserMetadata(key, value);
        return this.#api;
    }
    setUserId(user_id) {
        index.validate(index.PreUserRegistrationSetUserIdInputCodec, { user_id }, 'Invalid setUserId arguments');
        this.#triggerAPI.setUserId(user_id);
        return this.#api;
    }
}
class PreUserRegistrationAPIImpl {
    access;
    user;
    cache;
    validation;
    constructor(triggerAPI) {
        this.cache = triggerAPI.getCacheAPI();
        this.access = new AccessAPIImpl(triggerAPI, this);
        this.user = new UserAPIImpl(triggerAPI, this);
        this.validation = new ValidationAPIImpl(triggerAPI, this);
    }
}

function contextToArguments(ctx) {
    return [ctx.event, new PreUserRegistrationAPIImpl(ctx.triggerAPI)];
}
const getHandler = handler.getHandlerFactory([
    'onExecutePreUserRegistration',
    'onContinuePreUserRegistration',
]);

/**
 * Builds `contextToArguments` input for tests: a fresh clone of the example event paired with a stubbed
 * {@link PreUserRegistrationTriggerAPI}. The event is cloned per call so mutations in one execution don't leak into the next.
 */
function getDefaultArguments() {
    return contextToArguments({
        event: handler.deepClone(event),
        triggerAPI: new PreUserRegistrationTriggerAPIStubImpl(),
    });
}
/** Loads a PreUserRegistration v2 action file for use in tests, e.g. `action.execute('onExecutePreUserRegistration', event, api)`. */
const loadAction = handler.createLoader(getHandler);

exports.getDefaultArguments = getDefaultArguments;
exports.loadAction = loadAction;
