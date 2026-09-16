'use strict';

var handler = require('../../../_shared/_XK5Fidc.js');
require('node:vm');
require('async_hooks');
require('console');
require('stream');
require('node:fs/promises');
require('node:module');

/**
 * No-op {@link EventStreamTriggerAPI} for use in mock API implementations.
 */
class EventStreamTriggerAPIStubImpl {
    #cacheAPI = handler.createNoopCacheAPI();
    getCacheAPI() {
        return this.#cacheAPI;
    }
}

const event = {
    message: {
        id: 'evt_vjFVP5pVdfvsfRKatshkVV',
        type: 'user.created',
        source: 'urn:auth0:example.auth0app.com',
        specversion: '1.0',
        time: '2025-02-01T12:34:56Z',
        data: {
            object: {
                user_id: 'auth0|507f1f77bcf86cd799439020',
                email: 'john.doe@gmail.com',
                email_verified: false,
                username: 'johndoe',
                phone_number: '+15555555555',
                phone_verified: false,
                created_at: '2025-02-01T12:34:56Z',
                updated_at: '2025-02-01T12:34:56Z',
                identities: [
                    {
                        connection: 'Username-Password-Authentication',
                        user_id: '507f1f77bcf86cd799439020',
                        profileData: {
                            email: 'john.doe@gmail.com',
                            email_verified: false,
                            name: 'John Doe',
                            username: 'johndoe',
                            given_name: 'John',
                            family_name: 'Doe',
                            phone_number: '+15555555555',
                            phone_verified: false,
                        },
                        provider: 'custom',
                        isSocial: false,
                    },
                ],
                app_metadata: {
                    plan: 'pro',
                },
                user_metadata: {
                    hobby: 'skydiving',
                },
                picture: 'https://secure.gravatar.com/avatar/15626c5e0c749cb912f9d1ad48dba440?s=480&r=pg&d=https%3A%2F%2Fssl.gstatic.com%2Fs2%2Fprofiles%2Fimages%2Fsilhouette80.png',
                name: 'John Doe',
                nickname: 'John Doe',
                multifactor: ['sample'],
                last_ip: '10.0.0.1',
                last_login: '2025-02-01T12:34:56Z',
                logins_count: 42,
                blocked: false,
                given_name: 'John',
                family_name: 'Doe',
            },
            context: {
                client: {
                    id: 'QG4F6eABIgDzPvcKCMKUjo8c9iet2Skc',
                    name: 'My App',
                    metadata: {},
                },
                connection: {
                    id: 'con_kFOHQUeaCSC1Kjqz',
                    name: 'Username-Password-Authentication',
                    strategy: 'auth0',
                },
                request: {
                    geo: {
                        continent_code: 'NA',
                        country_code: 'US',
                        country_name: 'United States',
                        latitude: 37.3382,
                        longitude: -121.8863,
                        subdivision_code: 'CA',
                        subdivision_name: 'California',
                        city_name: 'San Jose',
                        time_zone: 'America/Los_Angeles',
                    },
                    hostname: 'example.auth0app.com',
                    custom_domain: 'login.example.com',
                    ip: '203.0.113.1',
                    method: 'POST',
                    user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                },
                tenant: {
                    id: 'my-tenant',
                },
            },
        },
        a0tenant: 'my-tenant',
        a0stream: 'est_vjFVP5pVdfvsfRKatshkVV',
        a0purpose: 'test',
    },
    configuration: {},
    secrets: {},
};

class EventStreamAPIImpl {
    cache;
    constructor(triggerAPI) {
        this.cache = triggerAPI.getCacheAPI();
    }
}

function contextToArguments(ctx) {
    return [ctx.event, new EventStreamAPIImpl(ctx.triggerAPI)];
}
const getHandler = handler.getHandlerFactory([
    'onExecuteEventStream',
]);

/**
 * Builds `contextToArguments` input for tests: a fresh clone of the example event paired with a stubbed
 * {@link EventStreamTriggerAPI}. The event is cloned per call so mutations in one execution don't leak into the next.
 */
function getDefaultArguments() {
    return contextToArguments({
        event: handler.deepClone(event),
        triggerAPI: new EventStreamTriggerAPIStubImpl(),
    });
}
/** Loads an EventStream v1 action file for use in tests, e.g. `action.execute('onExecuteEventStream', event, api)`. */
const loadAction = handler.createLoader(getHandler);

exports.getDefaultArguments = getDefaultArguments;
exports.loadAction = loadAction;
