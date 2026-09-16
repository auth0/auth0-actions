'use strict';

var handler = require('../../../_shared/_XK5Fidc.js');
require('node:vm');
require('async_hooks');
require('console');
require('stream');
require('node:fs/promises');
require('node:module');

/**
 * No-op {@link SendPhoneMessageTriggerAPI} for use in mock API implementations.
 */
class SendPhoneMessageTriggerAPIStubImpl {
    #cacheAPI = handler.createNoopCacheAPI();
    getCacheAPI() {
        return this.#cacheAPI;
    }
}

const event = {
    message_options: {
        action: 'enrollment',
        code: '1234556ADSFA547865',
        message_type: 'sms',
        recipient: '+1-808-555-5555',
        text: 'Here is your one time password!',
    },
    client: {
        client_id: 'gmOWNgklfRm4tyl5YYnl3JDSJy19h1bR',
        name: 'All Applications',
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
        ip: '13.33.86.47',
        method: 'POST',
        hostname: '{{TENANT}}.auth0.com',
        language: 'en',
        user_agent: 'curl/7.64.1',
    },
    tenant: {
        id: '{{TENANT}}',
    },
    user: {
        user_id: 'auth0|5f7c8ec7c33c6c004bbafe82',
        name: 'John Smith',
        email: 'j+smith@example.com',
        app_metadata: {},
        user_metadata: {},
        picture: 'http://www.gravatar.com/avatar/?d=identicon',
        created_at: '{{DATE}}',
        email_verified: true,
        updated_at: '{{DATE}}',
        multifactor: ['guardian'],
        family_name: 'Smith',
        given_name: 'John',
        nickname: 'j+smith',
        last_password_reset: '{{DATE}}',
        identities: [
            {
                connection: 'Username-Password-Authentication',
                isSocial: false,
                provider: 'auth0',
                userId: '5f7c8ec7c33c6c004bbafe82',
                accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gU21pdGgiLCJpYXQiOjE1MTYyMzkwMjJ9.Q_w2AVguPRU2KskCXwR7ZHl09TQXEntfEA8Jj2_Jyew',
                profileData: {},
                user_id: 'auth0|5f7c8ec7c33c6c004bbafe82',
            },
        ],
        phone_number: '+1-808-555-5555',
        phone_verified: false,
        username: 'j+smith',
    },
    configuration: {},
    secrets: {},
    security_context: {
        ja3: 'c13a3e168d43e62e0ad96fae6347e2e4',
        ja4: 't13d1516h2_8daaf6152771_02713d6af862',
    },
    transaction: {
        correlation_id: 'abcdef123456',
    },
};

class SendPhoneMessageAPIImpl {
    cache;
    constructor(triggerAPI) {
        this.cache = triggerAPI.getCacheAPI();
    }
}

function contextToArguments(ctx) {
    return [ctx.event, new SendPhoneMessageAPIImpl(ctx.triggerAPI)];
}
const getHandler = handler.getHandlerFactory(['onExecuteSendPhoneMessage']);

/**
 * Builds `contextToArguments` input for tests: a fresh clone of the example event paired with a stubbed
 * {@link SendPhoneMessageTriggerAPI}. The event is cloned per call so mutations in one execution don't leak into the next.
 */
function getDefaultArguments() {
    return contextToArguments({
        event: handler.deepClone(event),
        triggerAPI: new SendPhoneMessageTriggerAPIStubImpl(),
    });
}
/** Loads a SendPhoneMessage v2 action file for use in tests, e.g. `action.execute('onExecuteSendPhoneMessage', event, api)`. */
const loadAction = handler.createLoader(getHandler);

exports.getDefaultArguments = getDefaultArguments;
exports.loadAction = loadAction;
