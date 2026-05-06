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
   * lifetime of 24 hours will be used. Lifetimes may not exceed the maximum
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
interface NotificationsAPI {
  /**
   * When called, the notification event is considered failed without recovery:
   * We will log an error for this event, but won't be sending it again to the action in the future.
   * If you need this notification event to be retried, consider calling retry instead.
   * @param reason this reason will be part of the log entry, this will help you analyze the error further. Please note that this field is limited to 1024 characters and will be truncated if larger.
   */
  drop(reason: string): void;
  /**
   * When called, the notification event is considered failed, but recoverable:
   * We will log an error for this event, but we will retry it up to 5 times in the next minutes.
   * If you consider that this notification event should not be retried, consider calling drop instead.
   * @param reason this reason will be part of the log entry, this will help you analyze the error further. Please note that this field is limited to 1024 characters and will be truncated if larger.
   */
  retry(reason: string): void;
}
/**
 * Methods and utilities to inform whether or not the event message should be treated as an error or not.
 */
interface CustomPhoneProviderAPI {
  /**
   * Make changes to the cache.
   */
  readonly cache: CacheAPI;
  /**
   * Informs if we should consider the notification event as to be retried or to be dropped.
   * See each of these methods for further details on the actual behaviour.
   * If several calls are made, only the last one is considered.
   */
  readonly notification: NotificationsAPI;
}
/** CustomPhoneProviderV1Event */
type CustomPhoneProviderV1Event = {
  /** Information about the Client with which this login transaction was initiated. */
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
  /** Details about the Connection that was used to authenticate the user. */
  connection?: {
    /** The connection's unique identifier. */
    id: string;
    /** Metadata associated with the connection. */
    metadata?: {
      [additionalProperties: string]: string;
    };
    /** The name of the connection used to authenticate the user (such as `twitter` or `some-g-suite-domain`). */
    name: string;
    /** The type of connection. For social connections, `event.connection.strategy === event.connection.name`. For enterprise connections, the strategy is `waad` (Windows Azure AD), `ad` (Active Directory/LDAP), `auth0` (database connections), and so on. */
    strategy: string;
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
  notification: {
    /** The text, as we rendered it, ready to be delivered as a text message. */
    as_text: string;
    /** The text, as we rendered it, ready to be delivered as a voicetext message. */
    as_voice: string;
    /** The One Time Password that we drawn for this message for some types (e.g. `otp_verify`, `otp_enroll`). If provided, it is important to have it conveyed to the end-user. */
    code?: string;
    /** The way the message should be delivered. Could be `text` or `voice`. */
    delivery_method: 'text' | 'voice';
    /** The E.164 compliant phone number for the sender. */
    from?: string;
    /** The locale we rendered the message in, example `en_US`, as defined in the BCP-47 specification. */
    locale?: string;
    /** The type of message that is being send, like `otp_verify` or `blocked_account`. */
    message_type:
      | 'otp_verify'
      | 'otp_enroll'
      | 'blocked_account'
      | 'change_password'
      | 'password_breach';
    /** The E.164 compliant phone number for the recipient. */
    recipient: string;
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
  tenant: {
    /** The name of the tenant. */
    id: string;
    /** The friendly name for the tenant, usually a more human-readable version of the ID. */
    friendly_name?: string;
    /** The home URL for the tenant, if defined and as found in its settings. */
    home_url?: string;
    /** The logo URL for the tenant, if defined and as found in its settings. */
    logo_url?: string;
    /** The email to the tenant's support service, if defined and as found in its settings. */
    support_email?: string;
    /** The url to the tenant's support service, if defined and as found in its settings. */
    support_url?: string;
  };
  /** Details about the current transaction for tracing purposes. */
  transaction?: {
    /** A unique identifier to correlate this request across multiple services for distributed tracing. */
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
interface Configuration {}
interface Secrets {
  [secretName: string]: string;
}
interface Event extends CustomPhoneProviderV1Event {
  /**
   * @private Configuration values associated with this Action.
   */
  configuration: Configuration;
  /**
   * Secret values securely associated with this Action.
   */
  secrets: Secrets;
}
interface CustomPhoneProviderAction {
  (event: Event, api: CustomPhoneProviderAPI): Promise<void>;
}
export type { Configuration, CustomPhoneProviderAPI, CustomPhoneProviderAction, Event, Secrets };
