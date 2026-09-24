'use strict';

var handler = require('../../../_shared/_XK5Fidc.js');
var metadata = require('../../../_shared/Dygdkb3A.js');
var index = require('../../../_shared/BBcRtdsL.js');
require('node:vm');
require('async_hooks');
require('console');
require('stream');
require('node:fs/promises');
require('node:module');

/**
 * No-op {@link CustomTokenExchangeTriggerAPI} for use in mock API implementations.
 */
class CustomTokenExchangeTriggerAPIStubImpl {
    #cacheAPI = handler.createNoopCacheAPI();
    #transactionMetadataAPI = metadata.createNoopTransactionMetadataAPI();
    getCacheAPI() {
        return this.#cacheAPI;
    }
    getTransactionMetadataAPI() {
        return this.#transactionMetadataAPI;
    }
    deny(_code, _reason) { }
    rejectInvalidSubjectToken(_reason) { }
    setUserById(_user_id) { }
    setUserByConnection(_connection_name, _user_attributes, _options) { }
    setOrganization(_organization_id_or_name) { }
    setActor(_actor) { }
    setAppMetadata(_key, _value) { }
    setUserMetadata(_key, _value) { }
}

const event = {
    client: {
        authentication: {
            type: 'self_signed_tls_client_auth',
            certificate: {
                subject: 'CN=client.example.com',
                thumbprint256: 'qrvM3e7_ABEiM0RVZneImaq7zN3u_wARIjNEVWZ3iJk',
                raw: '-----BEGIN CERTIFICATE-----\nMIIB...\n-----END CERTIFICATE-----',
                subjectAltName: 'DNS:client.example.com, IP:127.0.0.1',
            },
        },
        name: 'All Applications',
        client_id: 'gmOWNgklfRm4tyl5YYnl3JDSJy19h1bR',
        external_client_id: 'https://example.com/oauth-client.json',
        metadata: {},
        external_metadata_type: 'cimd',
    },
    tenant: {
        id: '{{TENANT}}',
    },
    request: {
        body: {},
        hostname: '{{TENANT}}.auth0.com',
        ip: '13.33.86.47',
        method: 'GET',
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
        language: 'en',
        user_agent: 'curl/7.64.1',
    },
    transaction: {
        subject_token_type: 'http://auth0.com/oauth/token-type/third-party-artifact',
        subject_token: 'auth0|5f7c8ec7c33c6c004bbafe82',
        requested_scopes: [],
        requested_token_type: 'urn:ietf:params:oauth:token-type:access_token',
        actor_token: 'bbafe8c3c00425f7c8ec7afe8c3c004b...',
        actor_token_type: 'urn:ietf:params:oauth:token-type:id_token',
        actor_token_user: {
            app_metadata: {
                plan: 'premium',
            },
            created_at: '{{DATE}}',
            email_verified: true,
            email: 'j+smith@example.com',
            family_name: 'Smith',
            given_name: 'John',
            identities: [
                {
                    accessToken: 'abcdefg1234567',
                    connection: 'Username-Password-Authentication',
                    isSocial: false,
                    profileData: {},
                    provider: 'auth0',
                    userId: '5f7c8ec7c33c6c004bbafe82',
                    user_id: '5f7c8ec7c33c6c004bbafe82',
                },
            ],
            last_password_reset: '{{DATE}}',
            name: 'John Smith',
            nickname: 'jsmith',
            phone_number: '+15551234567',
            phone_verified: false,
            picture: 'http://www.gravatar.com/avatar/?d=identicon',
            updated_at: '{{DATE}}',
            user_id: 'auth0|5f7c8ec7c33c6c004bbafe82',
            user_metadata: {
                theme: 'dark',
            },
            username: 'jsmith',
            multifactor: [],
            enrolledFactors: [],
        },
    },
    resource_server: {
        identifier: '{{TENANT}}.auth0.com/api/v2',
    },
    secrets: {},
    configuration: {},
    organization: {
        id: 'org_1234567890',
        name: 'My Organization',
        display_name: 'My Org',
        metadata: {
            key: 'value',
        },
    },
    custom_domain: {
        domain: 'login.{{YOUR_DOMAIN}}.com',
        domain_metadata: {
            environment: 'production',
            region: 'us-west-2',
        },
    },
};

class AccessAPIImpl {
    #triggerAPI;
    constructor(triggerAPI) {
        this.#triggerAPI = triggerAPI;
    }
    deny(code, reason) {
        index.validate(index.CustomTokenExchangeDenyInputCodec, { code, reason }, 'Invalid deny arguments');
        this.#triggerAPI.deny(code, reason);
    }
    rejectInvalidSubjectToken(reason) {
        index.validate(index.CustomTokenExchangeRejectInvalidSubjectTokenInputCodec, { reason }, 'Invalid rejectInvalidSubjectToken arguments');
        this.#triggerAPI.rejectInvalidSubjectToken(reason);
    }
}

const ACTOR_MAX_NESTING_DEPTH = 5;
const ACTOR_MAX_CUSTOM_PROPERTY_COUNT = 5;
const ALLOWED_VALUE_TYPES = new Set(['string', 'number', 'boolean']);
const ACTOR_MAX_SUB_LENGTH = 512;
const ACTOR_MAX_PROPERTY_KEY_LENGTH = 64;
const ACTOR_MAX_STRING_VALUE_LENGTH = 64;
function validateActorLevel(source) {
    if (typeof source.sub !== 'string' || source.sub.length === 0) {
        throw new Error('The actor object must contain a sub claim.');
    }
    if (source.sub.length > ACTOR_MAX_SUB_LENGTH) {
        throw new Error(`Invalid setActor arguments: sub must NOT have more than ${ACTOR_MAX_SUB_LENGTH} characters`);
    }
    const { sub: _sub, act: _act, type: _type, ...customProps } = source;
    const customKeys = Object.keys(customProps);
    if (customKeys.length > ACTOR_MAX_CUSTOM_PROPERTY_COUNT) {
        throw new Error(`No more than ${ACTOR_MAX_CUSTOM_PROPERTY_COUNT} custom properties are allowed in the actor object.`);
    }
    for (const key of customKeys) {
        if (!ALLOWED_VALUE_TYPES.has(typeof customProps[key])) {
            throw new Error(`Custom property in an actor object must be a string, number, or boolean.`);
        }
        if (key.length > ACTOR_MAX_PROPERTY_KEY_LENGTH) {
            throw new Error(`Custom property key in an actor object must NOT have more than ${ACTOR_MAX_PROPERTY_KEY_LENGTH} characters.`);
        }
        if (typeof customProps[key] === 'string' &&
            customProps[key].length > ACTOR_MAX_STRING_VALUE_LENGTH) {
            throw new Error(`Custom string property value in an actor object must NOT have more than ${ACTOR_MAX_STRING_VALUE_LENGTH} characters.`);
        }
    }
}
function validateActor(actor) {
    if (!metadata.isObject(actor)) {
        throw new Error('The actor must be a plain object.');
    }
    validateActorLevel(actor);
    let source = actor;
    for (let depth = 2; depth <= ACTOR_MAX_NESTING_DEPTH; depth++) {
        if (source.act === undefined)
            return;
        if (!metadata.isObject(source.act)) {
            throw new Error('The act claim must be a plain object.');
        }
        validateActorLevel(source.act);
        source = source.act;
    }
    // act exists beyond the allowed nesting depth
    if (source.act !== undefined) {
        throw new Error(`Actor nesting must not exceed ${ACTOR_MAX_NESTING_DEPTH} levels.`);
    }
}
class AuthenticationAPIImpl {
    #triggerAPI;
    constructor(triggerAPI) {
        this.#triggerAPI = triggerAPI;
    }
    setUserById(user_id) {
        index.validate(index.CustomTokenExchangeSetUserByIdInputCodec, { user_id }, 'Invalid setUserById arguments');
        this.#triggerAPI.setUserById(user_id);
    }
    setUserByConnection(connection_name, user_attributes, options) {
        index.validate(index.CustomTokenExchangeSetUserByConnectionInputCodec, { connection_name, user_attributes, options }, 'Invalid setUserByConnection arguments');
        this.#triggerAPI.setUserByConnection(connection_name, user_attributes, options);
    }
    setOrganization(organization_id_or_name) {
        index.validate(index.CustomTokenExchangeSetOrganizationInputCodec, { organization_id_or_name }, 'Invalid setOrganization arguments');
        this.#triggerAPI.setOrganization(organization_id_or_name);
    }
    setActor(actor) {
        validateActor(actor);
        this.#triggerAPI.setActor(actor);
    }
}

/** Feature flag gating access to the transaction metadata API. */
const TRANSACTION_METADATA_FLAG = 'actions_cte_transaction_metadata';
class TransactionAPIImpl {
    #metadataAPI;
    #event;
    #featureFlags;
    constructor(metadataAPI, event, featureFlags) {
        this.#metadataAPI = metadataAPI;
        this.#event = event;
        this.#featureFlags = featureFlags;
    }
    setMetadata(key, value) {
        this.#assertFeatureEnabled();
        this.#metadataAPI.setMetadata(key, value);
        if (!this.#event.transaction) {
            this.#event.transaction = {};
        }
        this.#event.transaction.metadata = this.#metadataAPI.getMetadata();
    }
    // Prevent the internal transaction metadata API from being executed when the
    // gating feature flag is disabled. Remove this guard at GA.
    #assertFeatureEnabled() {
        if (this.#featureFlags[TRANSACTION_METADATA_FLAG] !== true) {
            throw new Error('Method not implemented.');
        }
    }
}

class UserAPIImpl {
    #triggerAPI;
    constructor(triggerAPI) {
        this.#triggerAPI = triggerAPI;
    }
    setAppMetadata(key, value) {
        index.validate(index.CustomTokenExchangeSetMetadataInputCodec, { key, value }, 'Invalid setAppMetadata arguments');
        this.#triggerAPI.setAppMetadata(key, value);
    }
    setUserMetadata(key, value) {
        index.validate(index.CustomTokenExchangeSetMetadataInputCodec, { key, value }, 'Invalid setUserMetadata arguments');
        this.#triggerAPI.setUserMetadata(key, value);
    }
}

class CustomTokenExchangeAPIImpl {
    access;
    authentication;
    user;
    cache;
    transaction;
    constructor(triggerAPI, event, featureFlags) {
        this.access = new AccessAPIImpl(triggerAPI);
        this.authentication = new AuthenticationAPIImpl(triggerAPI);
        this.user = new UserAPIImpl(triggerAPI);
        this.cache = triggerAPI.getCacheAPI();
        this.transaction = new TransactionAPIImpl(triggerAPI.getTransactionMetadataAPI(), event, featureFlags);
    }
}

function contextToArguments(ctx) {
    return [
        ctx.event,
        new CustomTokenExchangeAPIImpl(ctx.triggerAPI, ctx.event, ctx.featureFlags),
    ];
}
const getHandler = handler.getHandlerFactory([
    'onExecuteCustomTokenExchange',
]);

/**
 * Builds `contextToArguments` input for tests: a fresh clone of the example event paired with a stubbed
 * {@link CustomTokenExchangeTriggerAPI}. The event is cloned per call so mutations in one execution don't leak into the next.
 */
function getDefaultArguments() {
    return contextToArguments({
        event: handler.deepClone(event),
        triggerAPI: new CustomTokenExchangeTriggerAPIStubImpl(),
        featureFlags: {},
    });
}
/** Loads a CustomTokenExchange v1 action file for use in tests, e.g. `action.execute('onExecuteCustomTokenExchange', event, api)`. */
const loadAction = handler.createLoader(getHandler);

exports.getDefaultArguments = getDefaultArguments;
exports.loadAction = loadAction;
