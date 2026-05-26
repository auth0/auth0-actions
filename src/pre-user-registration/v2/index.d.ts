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
/** PreUserRegistrationV2Event */
type PreUserRegistrationV2Event = {
  /** Details about authentication obtained during the pre user registration flow. */
  authentication?: {
    /** Details about risk assessments information for different flows. */
    riskAssessment?: {
      /** Supplemental signals sent from third party providers to assist in risk assessments. */
      supplemental?: {
        /** [Early Access] Supplemental risk assessment. This is available only if Akamai Account Protector is enabled and Akamai forwards the headers for the transaction. */
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
  /** Details about the Connection that was used to register the user. */
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
    /** Any acr_values provided in the original authentication request. */
    acr_values: string[];
    /** The locale to be used for this transaction as determined by comparing the browser's requested languages to the tenant's language settings. */
    locale: string;
    /** Hint to the Authorization Server about the login identifier the End-User might use to log in (if necessary). */
    login_hint?: string;
    /** List of instructions indicating whether the user may be prompted for re-authentication and consent. */
    prompt?: string[];
    protocol?: (
      | 'oidc-basic-profile'
      | 'oidc-ciba'
      | 'oidc-ciba-web-link'
      | 'oidc-implicit-profile'
      | 'oauth2-device-code'
      | 'oauth2-resource-owner'
      | 'oauth2-resource-owner-jwt-bearer'
      | 'oauth2-password'
      | 'oauth2-webauthn'
      | 'oauth2-access-token'
      | 'oauth2-refresh-token'
      | 'oauth2-token-exchange'
      | 'oidc-hybrid-profile'
      | 'samlp'
      | 'wsfed'
      | 'wstrust-usernamemixed'
    ) &
      string;
    /** The URL to which Auth0 will redirect the browser after the transaction is completed. */
    redirect_uri?: string;
    /** The scopes requested (if any) when starting this authentication flow. */
    requested_scopes: string[];
    /** Informs the Authorization Server of the mechanism to be used for returning parameters from the Authorization Endpoint. */
    response_mode?: 'query' | 'fragment' | 'form_post' | 'web_message';
    /** Denotes the kind of credential that Auth0 will return. */
    response_type?: ('code' | 'token' | 'id_token')[];
    /** An opaque arbitrary alphanumeric string your app adds to the initial request that Auth0 includes when redirecting back to your application. */
    state?: string;
    /** The ui_locales provided in the original authentication request. */
    ui_locales: string[];
    /** Correlation ID can be provided in the initial authentication request when the application redirects to Universal Login. You can use value to correlate logs and requests from your Action code with the user flow. */
    correlation_id?: string;
  } & {
    [additionalProperties: string]: any;
  };
  /** An object describing the user who is attempting to register. */
  user: {
    /** Custom fields that store info about a user that influences the user's access, such as support plan, security roles, or access control groups. */
    app_metadata?: {
      [additionalProperties: string]: any;
    };
    /** (unique) User's email address. */
    email?: string;
    /** User's family name. */
    family_name?: string;
    /** User's given name. */
    given_name?: string;
    /** User's full name. */
    name?: string;
    /** User's nickname. */
    nickname?: string;
    /** User's phone number. */
    phone_number?: string;
    /** URL pointing to the [user's profile picture](https://auth0.com/docs/users/change-user-picture). */
    picture?: string;
    /** Custom fields that store info about a user that does not impact what they can or cannot access, such as work address, home address, or user preferences. */
    user_metadata?: {
      [additionalProperties: string]: any;
    };
    /** (unique) User's username. */
    username?: string;
  };
} & {
  [additionalProperties: string]: any;
};
interface AccessAPI {
  /**
   * Deny the user from being able to register. The signup flow will immediately stop following the
   * completion of this action and no further Actions will be executed.
   *
   * @param reason An internal reason describing why this registration attempt is being denied. This value
   * will appear in tenant logs.
   *
   * @param userMessage A human-readable explanation for rejecting the registration attempt. This may be presented
   * directly in end-user interfaces.
   */
  deny(reason: string, userMessage: string): PreUserRegistrationAPI;
}
interface ValidationAPI {
  /**
   * Deny the user from being able to register. The signup flow will immediately stop following the
   * completion of this action and no further Actions will be executed.
   *
   * @param errorCode A customer defined error code describing why this registration attempt is being denied. This value
   * will appear in tenant logs.
   *
   * @param errorMessage A customer defined explanation for rejecting the registration attempt. This may be presented
   * directly in end-user interfaces.
   */
  error(errorCode: string, errorMessage: string): PreUserRegistrationAPI;
}
interface UserAPI {
  /**
   * Set application-specific metadata for the user that is logging in.
   *
   * Note: This method should not be used in callbacks. Invoking this method won't update the metadata immediately.
   * You can call this several times throughout multiple actions of the same flow and the engine will aggregate the
   * changes and update the metadata at once before the flow is completed.
   *
   * @param key The metadata property to be set.
   * @param value The value of the metadata property. This may be set to `null` to remove the
   * metadata property.
   */
  setAppMetadata(key: string, value: unknown): PreUserRegistrationAPI;
  /**
   * Set general metadata for the user that is logging in.
   *
   * Note: This method should not be used in callbacks. Invoking this method won't update the metadata immediately.
   * You can call this several times throughout multiple actions of the same flow and the engine will aggregate the
   * changes and update the metadata at once before the flow is completed.
   *
   * @param key The metadata property to be set.
   * @param value The value of the metadata property. This may be set to `null` to remove the
   * metadata property.
   */
  setUserMetadata(key: string, value: unknown): PreUserRegistrationAPI;
}
/**
 * Methods and utilities to help change the behavior of the login flow.
 */
interface PreUserRegistrationAPI {
  /**
   * Modify the access of the user that is logging in, such as rejecting the login attempt.
   */
  readonly access: AccessAPI;
  /**
   * Make changes to the metadata of the user that is logging in.
   */
  readonly user: UserAPI;
  /**
   * Store and retrieve data that persists across executions.
   */
  readonly cache: CacheAPI;
  /**
   * Modify the access of the user that is logging in, such as rejecting the login attempt due to validation errors.
   * @interal
   */
  readonly validation: ValidationAPI;
}
interface Configuration {}
interface Secrets {
  [secretName: string]: string;
}
interface Event extends PreUserRegistrationV2Event {
  /**
   * @private Configuration values associated with this Action.
   */
  configuration: Configuration;
  /**
   * Secret values securely associated with this Action.
   */
  secrets: Secrets;
}
interface PreUserRegistrationAction {
  (event: Event, api: PreUserRegistrationAPI): Promise<void>;
}
export type { Configuration, Event, PreUserRegistrationAPI, PreUserRegistrationAction, Secrets };
