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
/**
 * Methods and utilities to help change the behavior after a user changes their password.
 */
interface PostChangePasswordAPI {
  /**
   * Store and retrieve data that persists across executions.
   */
  readonly cache: CacheAPI;
}
/** PostChangePasswordV2Event */
type PostChangePasswordV2Event = {
  /** Details about supplemental authentication signals obtained during the password change flow. */
  authentication?: {
    /** Details about risk assessments information for different flows. */
    riskAssessment?: {
      /** Supplemental signals sent from third party providers to assist in risk assessments. */
      supplemental?: {
        /** [Limited Early Access] Supplemental risk assessment. This is available only if Akamai Account Protector is enabled and Akamai forwards the headers for the transaction. */
        akamai?: {
          /** The bot detection results as forwarded by Akamai Bot Manager. */
          akamaiBot?: {
            /** The type of the Akamai bot manager results. */
            type?: string;
            /** The action of the Akamai bot manager results. */
            action?: string;
            /** The bot category of the Akamai bot manager results. */
            botCategory?: string[];
            /** The bot score of the Akamai bot manager results. */
            botScore?: number;
            /** The bot score response segment of the Akamai bot manager results. */
            botScoreResponseSegment?: string;
            /** The botnet ID of the Akamai bot manager results. */
            botnetId?: string;
          };
          /** The user risk detection results as forwarded by Akamai Account Protector. */
          akamaiUserRisk?: {
            /** The action of the Akamai user risk assessment. */
            action?: string;
            /** The allowed status of the Akamai user risk assessment. */
            allow?: number;
            /** The email domain of the user. */
            emailDomain?: string;
            /** The general risk of the Akamai user risk assessment. */
            general?: {
              [additionalProperties: string]: any;
            };
            /** The OUID of the user. */
            ouid?: string;
            /** The request ID of the user. */
            requestid?: string;
            /** The risk of the Akamai user risk assessment. */
            risk?: {
              [additionalProperties: string]: any;
            };
            /** The score of the Akamai user risk assessment. */
            score?: number;
            /** The status of the Akamai user risk assessment. */
            status?: number;
            /** The trust of the Akamai user risk assessment. */
            trust?: {
              [additionalProperties: string]: any;
            };
            /** The username of the user. */
            username?: string;
            /** The UUID of the Akamai user risk assessment. */
            uuid?: string;
          };
        };
      };
    };
  };
  /** Details about the Connection that was used for the current transaction. */
  connection: {
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
    /** (unique) User's email address. */
    email?: string;
    /** Indicates whether the user has verified their email address. */
    email_verified?: boolean;
    /** Timestamp indicating the last time the user's password was reset/changed. At user creation, this field does not exist. This property is only available for Database connections. */
    last_password_reset?: string;
    /** (unique) User's phone number. */
    phone_number?: string;
    /** Indicates whether the user has verified their phone number. */
    phone_verified?: boolean;
    /** (unique) User's unique identifier. */
    user_id?: string;
    /** (unique) User's username. */
    username?: string;
  };
} & {
  [additionalProperties: string]: any;
};
interface Configuration {}
interface Secrets {
  [secretName: string]: string;
}
interface Event extends PostChangePasswordV2Event {
  /**
   * @private Configuration values associated with this Action.
   */
  configuration: Configuration;
  /**
   * Secret values securely associated with this Action.
   */
  secrets: Secrets;
}
interface PostChangePasswordAction {
  (event: Event, api: PostChangePasswordAPI): Promise<void>;
}
export type { Configuration, Event, PostChangePasswordAPI, PostChangePasswordAction, Secrets };
