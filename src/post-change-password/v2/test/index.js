'use strict';

var handler = require('../../../_shared/_XK5Fidc.js');
require('node:vm');
require('async_hooks');
require('console');
require('stream');
require('node:fs/promises');
require('node:module');

/**
 * No-op {@link PostChangePasswordTriggerAPI} for use in mock API implementations.
 */
class PostChangePasswordTriggerAPIStubImpl {
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
    request: {
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
        ip: '10.12.13.1',
        method: 'post',
        hostname: '{{TENANT}}.auth0.com',
        language: 'en',
        user_agent: 'curl/7.64.1',
    },
    tenant: {
        id: '{{TENANT}}',
    },
    transaction: {
        correlation_id: 'abcefg123',
    },
    user: {
        id: '5f7c8ec7c33c6c004bbafe82',
        user_id: 'auth0|test12345',
        email: 'j+smith@example.com',
        email_verified: true,
        phone_number: '+13205550100',
        phone_verified: true,
        last_password_reset: '{{DATE}}',
        username: 'j+smith',
    },
    configuration: {},
    secrets: {},
};

class PostChangePasswordAPIImpl {
    cache;
    constructor(triggerAPI) {
        this.cache = triggerAPI.getCacheAPI();
    }
}

function contextToArguments(ctx) {
    return [ctx.event, new PostChangePasswordAPIImpl(ctx.triggerAPI)];
}
const getHandler = handler.getHandlerFactory([
    'onExecutePostChangePassword',
]);

/**
 * Builds `contextToArguments` input for tests: a fresh clone of the example event paired with a stubbed
 * {@link PostChangePasswordTriggerAPI}. The event is cloned per call so mutations in one execution don't leak into the next.
 */
function getDefaultArguments() {
    return contextToArguments({
        event: handler.deepClone(event),
        triggerAPI: new PostChangePasswordTriggerAPIStubImpl(),
    });
}
/** Loads a PostChangePassword v2 action file for use in tests, e.g. `action.execute('onExecutePostChangePassword', event, api)`. */
const loadAction = handler.createLoader(getHandler);

exports.getDefaultArguments = getDefaultArguments;
exports.loadAction = loadAction;
