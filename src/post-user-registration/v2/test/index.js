'use strict';

var handler = require('../../../_shared/_XK5Fidc.js');
require('node:vm');
require('async_hooks');
require('console');
require('stream');
require('node:fs/promises');
require('node:module');

/**
 * No-op {@link PostUserRegistrationTriggerAPI} for use in mock API implementations.
 */
class PostUserRegistrationTriggerAPIStubImpl {
    #cacheAPI = handler.createNoopCacheAPI();
    getCacheAPI() {
        return this.#cacheAPI;
    }
}

const event = {
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
        hostname: '{{TENANT}}.example.com',
        ip: '13.33.86.47',
        language: 'en',
        user_agent: 'curl/7.64.1',
        method: 'POST',
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
    connection: {
        id: 'con_fpe5kj482KO1eOzQ',
        name: 'Username-Password-Authentication',
        metadata: {},
        strategy: 'auth0',
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
    transaction: {
        acr_values: [],
        correlation_id: '1234567890',
        id: '',
        locale: '',
        requested_scopes: [],
        ui_locales: [],
        protocol: 'oauth2-refresh-token',
        redirect_uri: 'http://someuri.com',
        prompt: ['none'],
        login_hint: 'test@test.com',
        response_mode: 'form_post',
        response_type: ['id_token'],
        state: 'AABBccddEEFFGGTTasrs',
    },
    user: {
        tenant: '{{TENANT}}',
        username: 'j+smith',
        email: 'j+smith@example.com',
        phoneNumber: '123-123-1234',
        user_id: 'auth0|5f7c8ec7c33c6c004bbafe82',
        created_at: '{{DATE}}',
        email_verified: true,
        family_name: 'Smith',
        given_name: 'John',
        last_password_reset: '{{DATE}}',
        name: 'John Smith',
        nickname: 'j+smith',
        phone_verified: true,
        picture: 'http://www.gravatar.com/avatar/?d=identicon',
        updated_at: '{{DATE}}',
        app_metadata: {},
        user_metadata: {},
        phone_number: '123-123-1234',
    },
    configuration: {},
    secrets: {},
    security_context: {
        ja3: 'c13a3e168d43e62e0ad96fae6347e2e4',
        ja4: 't13d1516h2_8daaf6152771_02713d6af862',
    },
};

class PostUserRegistrationAPIImpl {
    cache;
    constructor(triggerAPI) {
        this.cache = triggerAPI.getCacheAPI();
    }
}

function contextToArguments(ctx) {
    return [ctx.event, new PostUserRegistrationAPIImpl(ctx.triggerAPI)];
}
const getHandler = handler.getHandlerFactory([
    'onExecutePostUserRegistration',
]);

/**
 * Builds `contextToArguments` input for tests: a fresh clone of the example event paired with a stubbed
 * {@link PostUserRegistrationTriggerAPI}. The event is cloned per call so mutations in one execution don't leak into the next.
 */
function getDefaultArguments() {
    return contextToArguments({
        event: handler.deepClone(event),
        triggerAPI: new PostUserRegistrationTriggerAPIStubImpl(),
    });
}
/** Loads a PostUserRegistration v2 action file for use in tests, e.g. `action.execute('onExecutePostUserRegistration', event, api)`. */
const loadAction = handler.createLoader(getHandler);

exports.getDefaultArguments = getDefaultArguments;
exports.loadAction = loadAction;
