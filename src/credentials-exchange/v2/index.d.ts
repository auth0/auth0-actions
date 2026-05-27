type CacheWriteErrorCode =
  | 'MaxSideEffectsExceeded'
  | 'CacheKeySizeExceeded'
  | 'CacheValueSizeExceeded'
  | 'CacheSizeExceeded'
  | 'ItemAlreadyExpired'
  | 'InvalidExpiry'
  | 'FailedToSetCacheRecord'
  | 'FailedToDeleteCacheRecord'
  | 'CacheKeyDoesNotExist';
/**
 * Details about a cached value.
 */
interface CacheRecord {
  /**
   * The cached value itself.
   */
  value: string;
  /**
   * Expiry time in milliseconds since the unix epoch.
   */
  expires_at: number;
}
interface CacheWriteSuccess {
  type: 'success';
  record: CacheRecord;
}
interface CacheWriteError {
  type: 'error';
  code: CacheWriteErrorCode;
}
type CacheWriteResult = CacheWriteSuccess | CacheWriteError;
interface CacheDeleteSuccess {
  type: 'success';
}
type CacheDeleteResult = CacheDeleteSuccess | CacheWriteError;
interface CacheSetOptions {
  /**
   * The absolute expiry time in milliseconds since the unix epoch.
   * While cached records may be evicted earlier, they will
   * never remain beyond the the supplied `expires_at`.
   *
   * *Note*: This value should not be supplied if a value was also
   * provided for `ttl`. If both options are supplied, the
   * earlier expiry of the two will be used.
   */
  expires_at?: number;
  /**
   * The time-to-live value of this cache entry in milliseconds.
   * While cached values may be evicted earlier, they will
   * never remain beyond the the supplied `ttl`.
   *
   * *Note*: This value should not be supplied if a value was also
   * provided for `expires_at`. If both options are supplied, the
   * earlier expiry of the two will be used.
   */
  ttl?: number;
}
/**
 * Methods and utilities to manage the Actions cache.
 */
interface CacheAPI {
  /**
   * Delete a record describing a cached value at the supplied
   * key if it exists.
   *
   * @param key The key of the cache record to delete.
   */
  delete(key: string): CacheDeleteResult;
  /**
   * Retrieve a record describing a cached value at the supplied key,
   * if it exists. If a record is found, the cached value can be found
   * at the `value` property of the returned object.
   *
   * @param key The key of the record stored in the cache.
   */
  get(key: string): CacheRecord | undefined;
  /**
   * Store or update a string value in the cache at the specified key.
   *
   * Values stored in this cache are scoped to the Trigger in which they
   * are set. They are subject to the {@link https://auth0.com/docs/customize/actions/limitations Actions Cache Limits}.
   *
   * Values stored in this way will have lifetimes of _up to_ the specified
   * `ttl` or `expires_at` values. If no lifetime is specified, a default of
   * lifetime of 15 minutes will be used. Lifetimes may not exceed the maximum
   * duration listed at {@link https://auth0.com/docs/customize/actions/limitations Actions Cache Limits}.
   *
   * **Important**: This cache is designed for short-lived, ephemeral data. Items may not be
   * available in later transactions even if they are within their supplied their lifetime.
   *
   * @param key The key of the record to be stored.
   * @param value The value of the record to be stored.
   * @param options Options for adjusting cache behavior.
   */
  set(key: string, value: string, options?: CacheSetOptions): CacheWriteResult;
}
/** CredentialsExchangeV2Event */
type CredentialsExchangeV2Event = {
  /** Information about the access token to be issued. */
  accessToken: {
    customClaims: {
      [additionalProperties: string]: any;
    };
    scope: string[];
  };
  /** Information about the Client used during this token exchange. */
  client: {
    /** The client id of the application the user is logging in to. */
    client_id: string;
    /** An object for holding other application properties. */
    metadata: {
      [additionalProperties: string]: string;
    };
    /** The name of the application (as defined in the Dashboard). */
    name: string;
  };
  /** Details about the custom domain associated with the current transaction. */
  custom_domain?: {
    /** The custom domain name. */
    domain: string;
    /** Custom domain metadata as key-value pairs. */
    domain_metadata: {
      [additionalProperties: string]: string;
    };
  };
  /** Details about the Organization associated with the current transaction. */
  organization?: {
    /** The Organization identifier. */
    id: string;
    /** The friendly name of the Organization. */
    display_name: string;
    /** Metadata associated with the Organization. */
    metadata: {
      [additionalProperties: string]: string;
    };
    /** The name of the Organization. */
    name: string;
  } & {
    [additionalProperties: string]: any;
  };
  /** Details about the request that initiated the transaction. */
  request: {
    /** The body of the POST request. This data will only be available during refresh token, Client Credential Exchange flows and PreUserRegistration Action. */
    body: {
      [additionalProperties: string]: any;
    };
    geoip: {
      cityName?: string;
      continentCode?: string;
      countryCode?: string;
      countryCode3?: string;
      countryName?: string;
      latitude?: number;
      longitude?: number;
      subdivisionCode?: string;
      subdivisionName?: string;
      timeZone?: string;
    } & {
      [additionalProperties: string]: any;
    };
    /** The hostname that is being used for the authentication flow. */
    hostname?: string;
    /** The originating IP address of the request. */
    ip: string;
    /** The language requested by the browser. */
    language?: string;
    /** The HTTP method used for the request */
    method: string;
    /** The value of the `User-Agent` header received when initiating the transaction. */
    user_agent?: string;
  };
  /** Information about the Resource Server that is issuing the access token. */
  resource_server: {
    /** The identifier of the resource server. For example: `https://your-api.example.com`. */
    identifier: string;
  };
  /** Information about the Tenant used during this token exchange. */
  tenant: {
    /** The name of the tenant. */
    id: string;
  };
  /** Information about the Credentials Exchange transaction. */
  transaction: {
    /** Correlation ID can be provided in the initial authentication request when the application redirects to Universal Login. You can use value to correlate logs and requests from your Action code with the user flow. */
    correlation_id?: string;
    /** The scopes specified (if any) when requesting the access token. */
    requested_scopes: string[];
    /** [Early Access] The live target scope set for the access token. Initialized from the client grants and immediately updated by api.transaction target scope methods across current and subsequent Actions. After all Actions complete, these scopes are intersected with the client grant. Scopes not present in the grant are silently dropped from the final access token. */
    target_scopes?: string[];
  };
};
type AccessDeniedErrorCode = 'invalid_scope' | 'invalid_request' | 'server_error';
interface Configuration {}
interface Secrets {
  [secretName: string]: string;
}
interface Event extends CredentialsExchangeV2Event {
  /**
   * @private Configuration values associated with this Action.
   */
  configuration: Configuration;
  /**
   * Secret values securely associated with this Action.
   */
  secrets: Secrets;
}
interface TransactionAPI {
  /**
   * [Early Access] Add a scope to the target scope set. Added scopes are intersected with the
   * client grant after all Actions complete. Scopes not present in the grant
   * are silently dropped from the final access token.
   *
   * @param scope The scope to add.
   * @throws Will throw an error if the scope is invalid.
   *
   * @example
   * ```js
   * exports.onExecuteCredentialsExchange = async (event, api) => {
   *   api.transaction.addTargetScope('read:reports');
   * };
   * ```
   */
  addTargetScope(scope: string): void;
  /**
   * [Early Access] Remove a scope from the target scope set.
   *
   * @param scope The scope to remove.
   * @throws Will throw an error if the scope is invalid.
   *
   * @example
   * ```js
   * exports.onExecuteCredentialsExchange = async (event, api) => {
   *   api.transaction.removeTargetScope('admin:full');
   * };
   * ```
   */
  removeTargetScope(scope: string): void;
  /**
   * [Early Access] Replace the entire target scope set. The new scopes are intersected with
   * the client grant after all Actions complete. Scopes not present in the
   * grant are silently dropped from the final access token.
   *
   * @param scopes The new target scope set.
   * @throws Will throw an error if any scope is invalid.
   *
   * @example
   * ```js
   * exports.onExecuteCredentialsExchange = async (event, api) => {
   *   api.transaction.setTargetScopes(['read:users', 'write:users']);
   * };
   * ```
   */
  setTargetScopes(scopes: string[]): void;
  /**
   * [Early Access] Remove all scopes from the target scope set.
   *
   * @example
   * ```js
   * exports.onExecuteCredentialsExchange = async (event, api) => {
   *   api.transaction.clearTargetScopes();
   * };
   * ```
   */
  clearTargetScopes(): void;
}
interface AccessAPI {
  /**
   * Mark the current token exchange as denied.
   *
   * @param code The protocol-specific error code justifying the rejection of the login.
   * @param reason A human-readable explanation for rejecting the access token grant.
   */
  deny(code: AccessDeniedErrorCode, reason?: string): CredentialsExchangeAPI;
}
interface AccessTokenAPI {
  /**
   * Set a custom claim on the Access Token that will be issued.
   *
   * @param key Name of the claim (note that this may need to be a fully-qualified url).
   * @param value The value of the claim.
   */
  setCustomClaim(key: string, value: unknown): CredentialsExchangeAPI;
}
/**
 * Methods and utilities to help change the behavior of the Client Credentials Exchange grant.
 */
interface CredentialsExchangeAPI {
  /**
   * Control availability to the access token.
   */
  readonly access: AccessAPI;
  /**
   * Request changes to the access token being issued.
   */
  readonly accessToken: AccessTokenAPI;
  /**
   * Make changes to the cache.
   */
  readonly cache: CacheAPI;
  /**
   * [Early Access] Make changes to the transaction.
   */
  readonly transaction: TransactionAPI;
}
interface CredentialsExchangeAction {
  (event: Event, api: CredentialsExchangeAPI): Promise<void>;
}
export type { Configuration, CredentialsExchangeAPI, CredentialsExchangeAction, Event, Secrets };
