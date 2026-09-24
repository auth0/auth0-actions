'use strict';

var handler = require('../../../_shared/_XK5Fidc.js');
var targetScopes = require('../../../_shared/BmQoefei.js');
require('node:vm');
require('async_hooks');
require('console');
require('stream');
require('node:fs/promises');
require('node:module');
require('../../../_shared/BBcRtdsL.js');

/**
 * No-op {@link CredentialsExchangeTriggerAPI} for use in mock API implementations.
 */
class CredentialsExchangeTriggerAPIStubImpl {
    #cacheAPI = handler.createNoopCacheAPI();
    #targetScopesAPI;
    constructor(initialTargetScopes = []) {
        this.#targetScopesAPI = targetScopes.createNoopTargetScopesAPI(initialTargetScopes);
    }
    getCacheAPI() {
        return this.#cacheAPI;
    }
    getTargetScopesAPI() {
        return this.#targetScopesAPI;
    }
    denyAccess(_code, _reason) { }
    setCustomClaim(_key, _value) { }
}

const event = {
    accessToken: {
        scope: ['read:entity'],
        customClaims: {},
    },
    agent: {
        agent_id: 'agt_abc123',
        name: 'My Agent',
        agent_metadata: {
            env: 'production',
        },
    },
    transaction: {
        requested_scopes: ['read:entity'],
    },
    resource_server: {
        identifier: '{{TENANT}}.auth0.com/api/v2',
    },
    tenant: {
        id: '{{TENANT}}',
    },
    configuration: {},
    secrets: {},
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
        client_id: 'client-id',
        name: 'A Client Application',
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
        ip: '10.12.13.1',
        method: 'POST',
        body: {
            client_id: 'client-id',
            client_secret: 'client-secret',
            audience: '{{TENANT}}.auth0.com/api/v2',
            grant_type: 'client_credentials',
        },
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
    organization: {
        display_name: 'My Organization',
        id: 'org_juG7cAQ0CymOcVpV',
        metadata: {
            key: 'value',
        },
        name: 'my-organization',
    },
};

class TransactionAPIImpl {
    #targetScopesAPI;
    #eventTransaction;
    constructor(targetScopesAPI, eventTransaction) {
        this.#targetScopesAPI = targetScopesAPI;
        this.#eventTransaction = eventTransaction;
    }
    addTargetScope(scope) {
        this.#targetScopesAPI.addTargetScope(scope);
        this.#syncEventTargetScopes();
    }
    removeTargetScope(scope) {
        this.#targetScopesAPI.removeTargetScope(scope);
        this.#syncEventTargetScopes();
    }
    setTargetScopes(scopes) {
        this.#targetScopesAPI.setTargetScopes(scopes);
        this.#syncEventTargetScopes();
    }
    clearTargetScopes() {
        this.#targetScopesAPI.clearTargetScopes();
        this.#syncEventTargetScopes();
    }
    #syncEventTargetScopes() {
        this.#eventTransaction.target_scopes = this.#targetScopesAPI.getTargetScopes();
    }
}

class AccessAPIImpl {
    #api;
    #triggerAPI;
    constructor(triggerAPI, api) {
        this.#api = api;
        this.#triggerAPI = triggerAPI;
    }
    deny(code, reason) {
        this.#triggerAPI.denyAccess(code, reason);
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
        this.#triggerAPI.setCustomClaim(key, value);
        return this.#api;
    }
}
class CredentialsExchangeAPIImpl {
    access;
    accessToken;
    cache;
    transaction;
    constructor(triggerAPI, eventTransaction) {
        this.access = new AccessAPIImpl(triggerAPI, this);
        this.accessToken = new AccessTokenAPIImpl(triggerAPI, this);
        this.cache = triggerAPI.getCacheAPI();
        this.transaction = new TransactionAPIImpl(triggerAPI.getTargetScopesAPI(), eventTransaction);
    }
}

function contextToArguments({ event, triggerAPI, }) {
    return [event, new CredentialsExchangeAPIImpl(triggerAPI, event.transaction)];
}
const getHandler = handler.getHandlerFactory([
    'onExecuteCredentialsExchange',
]);

/**
 * Builds `contextToArguments` input for tests: a fresh clone of the example event paired with a stubbed
 * {@link CredentialsExchangeTriggerAPI}. The event is cloned per call so mutations in one execution don't leak into the next.
 */
function getDefaultArguments() {
    const event$1 = handler.deepClone(event);
    return contextToArguments({
        event: event$1,
        triggerAPI: new CredentialsExchangeTriggerAPIStubImpl([...(event$1.accessToken?.scope ?? [])]),
    });
}
/** Loads a CredentialsExchange v2 action file for use in tests, e.g. `action.execute('onExecuteCredentialsExchange', event, api)`. */
const loadAction = handler.createLoader(getHandler);

exports.getDefaultArguments = getDefaultArguments;
exports.loadAction = loadAction;
