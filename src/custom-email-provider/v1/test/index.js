'use strict';

var handler = require('../../../_shared/_XK5Fidc.js');
require('node:vm');
require('async_hooks');
require('console');
require('stream');
require('node:fs/promises');
require('node:module');

/**
 * No-op {@link CustomEmailProviderTriggerAPI} for use in mock API implementations.
 */
class CustomEmailProviderTriggerAPIStubImpl {
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
        message_type: 'verify_email',
        to: 'email@email.com',
        locale: 'en-US',
        html: '<p>This is the HTML you should send</p>',
        text: 'This is the text you should send',
        subject: 'Email sent from Custom Email Provider',
        from: 'example@example.com',
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
        ip: '1.2.3.4',
        user_agent: 'browser',
        query: {
            'ext-test': 'test',
        },
        hostname: '{{TENANT}}.auth0.com',
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
        user_id: 'auth0|5f7c8ec7c33c6c004bbafe82',
        username: 'John Smith',
        name: 'Johny Smith',
        given_name: 'John',
        family_name: 'Smith',
        nickname: 'Johnny',
        email: 'j+smith@example.com',
        email_verified: true,
        picture: 'https://www.gravatar.com/avatar/?d=identicon',
        user_metadata: {},
        app_metadata: {},
        profile_id: 'profile_id',
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
class CustomEmailProviderAPIImpl {
    cache;
    notification;
    constructor(triggerAPI) {
        this.cache = triggerAPI.getCacheAPI();
        this.notification = new NotificationsAPIImpl(triggerAPI);
    }
}

function contextToArguments(ctx) {
    return [ctx.event, new CustomEmailProviderAPIImpl(ctx.triggerAPI)];
}
const getHandler = handler.getHandlerFactory([
    'onExecuteCustomEmailProvider',
]);

/**
 * Builds `contextToArguments` input for tests: a fresh clone of the example event paired with a stubbed
 * {@link CustomEmailProviderTriggerAPI}. The event is cloned per call so mutations in one execution don't leak into the next.
 */
function getDefaultArguments() {
    return contextToArguments({
        event: handler.deepClone(event),
        triggerAPI: new CustomEmailProviderTriggerAPIStubImpl(),
    });
}
/** Loads a CustomEmailProvider v1 action file for use in tests, e.g. `action.execute('onExecuteCustomEmailProvider', event, api)`. */
const loadAction = handler.createLoader(getHandler);

exports.getDefaultArguments = getDefaultArguments;
exports.loadAction = loadAction;
