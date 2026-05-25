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
/** SendPhoneMessageV2Event */
type SendPhoneMessageV2Event = {
  /** Information about the Client with which this transaction was initiated. */
  client?: {
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
  /** Details about the message that is sent to the user. */
  message_options: {
    /** The flow that triggered this action. */
    action: ('enrollment' | 'second-factor-authentication') & string;
    /** One-time password that the user needs to use to enter in the form. */
    code: string;
    /** How the message will be delivered, either by 'sms' or 'voice'. */
    message_type: ('sms' | 'voice') & string;
    /** Phone number where the message will be sent. */
    recipient: string;
    /** Content of the message to be sent. */
    text: string;
  };
  /** Details about the request that initiated the transaction. */
  request: {
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
  /** An object containing fingerprint signatures. This will be available only if the client is using cloudflare. The JA3/JA4 fingerprint can be null or empty in some cases. The most common case is for HTTP requests because JA3 and JA4 are calculated in TLS. It can also be empty due to the Worker sending requests within the same zone or to a zone that is not proxied (or a third party). */
  security_context?: {
    /** JA3 fingerprint signature. This will be available only if the client is using a TLS connection. */
    ja3?: string;
    /** JA4 fingerprint signature. This will be available only if the client is using a TLS connection. */
    ja4?: string;
  };
  /** Details about the Tenant associated with the current transaction. */
  tenant: {
    /** The name of the tenant. */
    id: string;
  };
  /** Details about the current transaction. */
  transaction?: {
    /** Correlation ID can be provided in the initial authentication request when the application redirects to Universal Login. You can use value to correlate logs and requests from your Action code with the user flow. */
    correlation_id?: string;
  };
  /** An object describing the user on whose behalf the current transaction was initiated. */
  user: {
    /** Custom fields that store info about a user that influences the user's access, such as support plan, security roles, or access control groups. */
    app_metadata: {
      [additionalProperties: string]: any;
    };
    /** Timestamp indicating when the user profile was first created. */
    created_at: string;
    /** (unique) User's email address. */
    email?: string;
    /** Indicates whether the user has verified their email address. */
    email_verified: boolean;
    /** User's family name. */
    family_name?: string;
    /** User's given name. */
    given_name?: string;
    /** Timestamp indicating the last time the user's password was reset/changed. At user creation, this field does not exist. This property is only available for Database connections. */
    last_password_reset?: string;
    /** User's full name. */
    name?: string;
    /** User's nickname. */
    nickname?: string;
    /** User's phone number. */
    phone_number?: string;
    /** Indicates whether the user has verified their phone number. */
    phone_verified?: boolean;
    /** URL pointing to the [user's profile picture](https://auth0.com/docs/users/change-user-picture). */
    picture?: string;
    /** Timestamp indicating when the user's profile was last updated/modified. */
    updated_at: string;
    /** (unique) User's unique identifier. */
    user_id: string;
    /** Custom fields that store info about a user that does not impact what they can or cannot access, such as work address, home address, or user preferences. */
    user_metadata: {
      [additionalProperties: string]: any;
    };
    /** (unique) User's username. */
    username?: string;
    /** Contains info retrieved from the identity provider with which the user originally authenticates. Users may also link their profile to multiple identity providers; those identities will then also appear in this array. The contents of an individual identity provider object varies by provider. */
    identities?: ({
      /** Name of the Auth0 connection used to authenticate the user. */
      connection?: string;
      /** Indicates whether the connection is a social one. */
      isSocial?: boolean;
      /** User information associated with the connection. When profiles are linked, it is populated with the associated user info for secondary accounts. */
      profileData?: {
        [additionalProperties: string]: string;
      };
      /** Name of the entity that is authenticating the user, such as Facebook, Google, SAML, or your own provider. */
      provider?: string;
      /** User's unique identifier for this connection/provider. */
      user_id?: string;
    } & {
      [additionalProperties: string]: any;
    })[];
  } & {
    [additionalProperties: string]: any;
  };
};
/**
 * Methods and utilities to help change the behavior of sending a phone message.
 */
interface SendPhoneMessageAPI {
  /**
   * Store and retrieve data that persists across executions.
   */
  readonly cache: CacheAPI;
}
interface Configuration {}
interface Secrets {
  [secretName: string]: string;
}
interface Event extends SendPhoneMessageV2Event {
  /**
   * @private Configuration values associated with this Action.
   */
  configuration: Configuration;
  /**
   * Secret values securely associated with this Action.
   */
  secrets: Secrets;
}
interface SendPhoneMessageAction {
  (event: Event, api: SendPhoneMessageAPI): Promise<void>;
}
export type { Configuration, Event, Secrets, SendPhoneMessageAPI, SendPhoneMessageAction };
