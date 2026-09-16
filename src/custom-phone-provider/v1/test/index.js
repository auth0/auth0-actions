'use strict';

var handler = require('../../../_shared/_XK5Fidc.js');
require('node:vm');
require('async_hooks');
require('console');
require('stream');
require('node:fs/promises');
require('node:module');

/**
 * No-op {@link CustomPhoneProviderTriggerAPI} for use in mock API implementations.
 */
class CustomPhoneProviderTriggerAPIStubImpl {
    #cacheAPI = handler.createNoopCacheAPI();
    getCacheAPI() {
        return this.#cacheAPI;
    }
    drop(_reason) { }
    retry(_reason) { }
}

const event = {
    client: {
        name: 'All Applications',
        client_id: 'gmOWNgklfRm4tyl5YYnl3JDSJy19h1bR',
        external_client_id: 'https://example.com/oauth-client.json',
        metadata: {},
        external_metadata_type: 'cimd',
    },
    notification: {
        as_text: 'This is the text you should send, with otp: 123456',
        as_voice: 'Hello. This is the text you should send, with otp: 1. 2. 3. 4. 5. 6. I repeat, 1. 2. 3. 4. 5. 6. ',
        delivery_method: 'text',
        message_type: 'otp_verify',
        recipient: '+1-808-555-5555',
        code: '123456',
        locale: 'en-US',
        from: '+1-808-555-2222',
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
    custom_domain: {
        domain: 'login.{{YOUR_DOMAIN}}.com',
        domain_metadata: {
            environment: 'production',
            region: 'us-west-2',
        },
    },
    tenant: {
        id: '{{TENANT}}',
        friendly_name: 'Friendly {{TENANT}}',
        home_url: 'https://example.com/home',
        logo_url: 'https://www.gravatar.com/avatar/?d=monsterid',
        support_email: 'email@example.com',
        support_url: 'https://example.com/support',
    },
    transaction: {
        correlation_id: 'abcefg123',
    },
    user: {
        app_metadata: {},
        created_at: '{{DATE}}',
        email_verified: true,
        updated_at: '{{DATE}}',
        user_id: 'auth0|5f7c8ec7c33c6c004bbafe82',
        user_metadata: {},
        email: 'j+smith@example.com',
        family_name: 'Smith',
        given_name: 'John',
        last_password_reset: '{{DATE}}',
        name: 'Johny Smith',
        nickname: 'Johnny',
        phone_number: '+15555555555',
        phone_verified: true,
        picture: 'https://www.gravatar.com/avatar/?d=identicon',
        username: 'John Smith',
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
    },
    organization: {
        display_name: 'My Org',
        id: 'my-org',
        metadata: {},
        name: 'MyOrg',
    },
    connection: {
        id: 'con_example',
        name: 'auth0',
        strategy: 'auth0',
        metadata: {},
    },
    configuration: {},
    secrets: {},
};

class NotificationsAPIImpl {
    #triggerAPI;
    constructor(triggerAPI) {
        this.#triggerAPI = triggerAPI;
    }
    drop(reason) {
        this.#triggerAPI.drop(reason);
    }
    retry(reason) {
        this.#triggerAPI.retry(reason);
    }
}
class CustomPhoneProviderAPIImpl {
    cache;
    notification;
    constructor(triggerAPI) {
        this.cache = triggerAPI.getCacheAPI();
        this.notification = new NotificationsAPIImpl(triggerAPI);
    }
}

function contextToArguments(ctx) {
    return [ctx.event, new CustomPhoneProviderAPIImpl(ctx.triggerAPI)];
}
const getHandler = handler.getHandlerFactory([
    'onExecuteCustomPhoneProvider',
]);

/**
 * Builds `contextToArguments` input for tests: a fresh clone of the example event paired with a stubbed
 * {@link CustomPhoneProviderTriggerAPI}. The event is cloned per call so mutations in one execution don't leak into the next.
 */
function getDefaultArguments() {
    return contextToArguments({
        event: handler.deepClone(event),
        triggerAPI: new CustomPhoneProviderTriggerAPIStubImpl(),
    });
}
/** Loads a CustomPhoneProvider v1 action file for use in tests, e.g. `action.execute('onExecuteCustomPhoneProvider', event, api)`. */
const loadAction = handler.createLoader(getHandler);

exports.getDefaultArguments = getDefaultArguments;
exports.loadAction = loadAction;
