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
/** EnrollmentFactorSelector */
type EnrollmentFactorSelector =
  | {
      /** A type of authentication factor such as `push-notification`, `phone`, `otp`, `webauthn-roaming`, `webauthn-platform`, and `recovery-code`. */
      type:
        | 'otp'
        | 'webauthn-platform'
        | 'webauthn-roaming'
        | 'push'
        | 'push-notification'
        | 'recovery-code';
      /** Additional options for configuring a factor of a given type. */
      options?: {
        [property: string]: any;
      };
    }
  | {
      /** A type of authentication factor such as `phone`. */
      type: 'phone';
      /** Additional options for configuring the phone factor. */
      options?: {
        /** The method passed in this filed will be preferred over the others if available. */
        preferredMethod?: 'sms' | 'voice' | 'both';
      };
    };
/** FactorSelector */
type FactorSelector =
  | {
      /** A type of authentication factor such as `push-notification`, `phone`, `email`, `otp`, `webauthn-roaming`, `webauthn-platform`, and `recovery-code`. */
      type: 'otp' | 'email' | 'webauthn-platform' | 'webauthn-roaming' | 'recovery-code';
      /** Additional options for configuring a factor of a given type. */
      options?: {
        [property: string]: any;
      };
    }
  | {
      /** A type of authentication factor such as `phone`. */
      type: 'phone';
      /** Additional options for configuring the phone factor. */
      options?: {
        /** The method passed in this filed will be preferred over the others if available. */
        preferredMethod?: 'sms' | 'voice' | 'both';
      };
    }
  | {
      /** A type of authentication factor such as `push-notification`. */
      type: 'push' | 'push-notification';
      /** Additional options for configuring the push factor. */
      options?: {
        /** If this is set to false, the OTP fallback method for the push factor will not be available for the user. */
        otpFallback?: boolean;
      };
    };
/** RequireMultifactorAuth */
type RequireMultifactorAuth =
  | {
      type: 'RequireMultifactorAuth';
      allowRememberBrowser?: boolean;
      provider: 'duo';
      providerOptions?: {
        host: string;
        ikey: string;
        skey: string;
        username?: string;
      };
    }
  | {
      type: 'RequireMultifactorAuth';
      allowRememberBrowser?: boolean;
      provider: 'none' | 'guardian' | 'google-authenticator' | 'any';
    };
/** PostLoginV3Event */
type PostLoginV3Event = {
  /** Details about authentication signals obtained during the login flow. */
  authentication?: {
    /** Contains the authentication methods a user has completed during their session. */
    methods: (
      | {
          /**
           * The name of the first factor that was completed. Values include the following:
           * - `federated` A social or enterprise connection was used to authenticate the user as the first factor.
           * - `pwd` A password was used to authenticate a database connection user as the first factor.
           * - `passkey` A passkey was used to authenticate a database connection user as the first factor.
           * - `sms` A Passwordless SMS connection was used to authenticate the user as the first factor.
           * - `email` A Passwordless Email connection was used to authenticate the user as the first factor or verify email for password reset.
           * - `phone_number` A phone number was used for password reset.
           * - `mock` Used for internal testing.
           * - May also be a URL denoting a custom authentication method (as second or later factor).
           * @summary First Factor
           */
          name: string;
          timestamp: string;
        }
      | {
          /**
           * The user completed multi-factor authentication (second or later factors).
           * @summary Multi-factor Authentication
           */
          name: 'mfa';
          timestamp: string;
        }
    )[];
    /** Details about risk assessments obtained during the login or password reset flow. */
    riskAssessment?: {
      assessments: {
        /** Determines if the user is logging in from a location signaling impossible travel. */
        ImpossibleTravel?: {
          code:
            | 'minimal_travel_from_last_login'
            | 'travel_from_last_login'
            | 'substantial_travel_from_last_login'
            | 'impossible_travel_from_last_login'
            | 'invalid_travel'
            | 'missing_geoip'
            | 'anonymous_proxy'
            | 'unknown_location'
            | 'initial_login'
            | 'location_history_not_found'
            | 'assessment_not_available';
          confidence: 'low' | 'medium' | 'high' | 'neutral';
        };
        /** Determines if the user is logging in from a known device. */
        NewDevice?: {
          code:
            | 'match'
            | 'partial_match'
            | 'no_match'
            | 'initial_login'
            | 'unknown_device'
            | 'no_device_history'
            | 'assessment_not_available';
          confidence: 'low' | 'medium' | 'high' | 'neutral';
          details?: {
            device?: 'known' | 'unknown';
            useragent?: 'known' | 'unknown';
          };
        };
        /** Shows if the IP was found in Auth0's repository of low reputation IPs. */
        UntrustedIP?: {
          code:
            | 'not_found_on_deny_list'
            | 'found_on_deny_list'
            | 'invalid_ip_address'
            | 'assessment_not_available';
          confidence: 'low' | 'medium' | 'high' | 'neutral';
          details?: {
            category?: string;
            /** The originating IP address of the request. */
            ip?: string;
            matches?: string;
            source?: string;
          };
        };
      };
      /** Overall risk score */
      confidence: 'low' | 'medium' | 'high' | 'neutral';
      /** [Limited Early Access] Supplemental risk assessment. */
      supplemental?: {
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
        } & {
          [additionalProperties: string]: any;
        };
      };
      version: string;
    };
  };
  /** An object containing information describing the authorization granted to the user who is logging in. */
  authorization?: {
    /** An array containing the names of a user's assigned roles. */
    roles: string[];
  };
  /** Information about the Client with which this login transaction was initiated. */
  client: {
    /** The client id of the application to which the user is logging in. */
    client_id: string;
    /** An object for holding other application properties. */
    metadata: {
      [additionalProperties: string]: string;
    };
    /** The name of the application (as defined in the Dashboard). */
    name: string;
    /** [Private Early Access] An object for holding refresh token configuration properties. */
    refresh_token?: {
      /** [Private Early Access] A collection of policies governing multi-resource refresh token exchange (MRRT), defining how refresh tokens can be used across different resource servers */
      policies?: {
        /** [Private Early Access] The specific resource server (audience) to which this MRRT policy applies. */
        audience?: string;
        /** The scopes of access that are authorized for the resource server (audience). */
        scope?: string[];
      }[];
    };
  };
  /** Details about the Connection that was used to authenticate the user. */
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
  /** Collected data from rendered custom prompts. */
  prompt?: {
    /** The prompt ID. */
    id: string;
    /** Fields and hidden fields data. */
    fields?: {
      [additionalProperties: string]: any;
    };
    /** Shared variables data. */
    vars?: {
      [additionalProperties: string]: any;
    };
  };
  /** [Enterprise Customers] The current refresh token. */
  refresh_token?: {
    /** [Enterprise Customers] The ID of the refresh token. */
    id: string;
    /** [Enterprise Customers] The ID of the client associated with the refresh token. */
    client_id?: string;
    /** [Enterprise Customers] Timestamp of when the refresh token was created. */
    created_at: string;
    device?: {
      /** [Enterprise Customers] First autonomous system number associated with this refresh token. */
      initial_asn?: string;
      /** [Enterprise Customers] First IP address associated with this refresh token. */
      initial_ip?: string;
      /** [Enterprise Customers] First user agent of the device associated with this refresh token. */
      initial_user_agent?: string;
      /** [Enterprise Customers] Last autonomous system number from which this refresh token was last exchanged. */
      last_asn?: string;
      /** [Enterprise Customers] Last IP address from which this refresh token was last exchanged. */
      last_ip?: string;
      /** [Enterprise Customers] Last user agent of the device from which this refresh token was last exchanged. */
      last_user_agent?: string;
    };
    /** [Enterprise Customers] Timestamp of when the refresh token will absolutely expire. */
    expires_at?: string;
    /** [Enterprise Customers] Timestamp of when the refresh token will idle expire. */
    idle_expires_at?: string;
    /** [Enterprise Customers] Timestamp of when the refresh token was last successfully exchanged. */
    last_exchanged_at?: string;
    resource_servers?: {
      /** [Enterprise Customers] The audience of the refresh token. */
      audience: string;
      /** [Enterprise Customers] Scopes of the refresh token. */
      scopes: string;
    }[];
    /** [Enterprise Customers] If the refresh token is a rotating refresh token. */
    rotating?: boolean;
    /** [Enterprise Customers] The ID of the session bound to the refresh token. */
    session_id?: string;
    /** [Enterprise Customers] This object is defined when the session is created from a session transfer token (Native to Web SSO), undefined otherwise. */
    session_transfer?: {
      /** [Enterprise Customers] This object is defined when the refresh token is created from a session initiated as a result of session transfer (Native to Web SSO), undefined otherwise. */
      parent_refresh_token?: {
        /** [Enterprise Customers] The ID of the parent refresh token from which this session/refresh token was created as a result of a session transfer (Native to Web SSO). */
        id?: string;
      };
    };
    /** [Enterprise Customers] The ID of the user bound to the refresh token. */
    user_id?: string;
  };
  /** Details about the request that initiated the transaction. */
  request: {
    /** The ASN (autonomous system number) of the user-agent making the request. */
    asn?: string;
    /** The body of the POST request. This data will only be available during refresh token and Client Credential Exchange flows and Post Login Action. */
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
    /** The query string parameters sent to the authorization request. */
    query: {
      [additionalProperties: string]: any;
    };
    /** The value of the `User-Agent` header received when initiating the transaction. */
    user_agent?: string;
  };
  /** Details about the resource server to which the access is being requested. */
  resource_server?: {
    /** The identifier of the resource server. For example: `https://your-api.example.com`. */
    identifier: string;
  };
  /** An object containing fingerprint signatures. This will be available only if the client is using cloudflare. The JA3/JA4 fingerprint can be null or empty in some cases. The most common case is for HTTP requests because JA3 and JA4 are calculated in TLS. It can also be empty due to the Worker sending requests within the same zone or to a zone that is not proxied (or a third party). */
  security_context?: {
    /** JA3 fingerprint signature. This will be available only if the client is using a TLS connection. */
    ja3?: string;
    /** JA4 fingerprint signature. This will be available only if the client is using a TLS connection. */
    ja4?: string;
  };
  /** The current login session. */
  session?: {
    /** The ID of the current session. */
    id: string;
    /** [Enterprise Customers] The date and time when the session was last authenticated. */
    authenticated_at?: string;
    /** [Enterprise Customers] List of client details for the session. */
    clients?: {
      /** [Enterprise Customers] ID of client for the session. */
      client_id: string;
    }[];
    /** [Enterprise Customers] Cookie configuration for the session, which determines how the session cookie is handled by the User Agent. */
    cookie?: {
      /** [Enterprise Customers] The persistence mode of the session cookie. When set to 'non-persistent' (ephemeral), the cookie will be deleted when the browser is closed. When set to 'persistent', the cookie will be stored until it expires or is deleted by the user. */
      mode: 'persistent' | 'non-persistent';
    };
    /** [Enterprise Customers] The date and time when the session was created. */
    created_at?: string;
    /** [Enterprise Customers] Metadata related to the device used in the session. */
    device?: {
      /** [Enterprise Customers] First autonomous system number associated with this session. */
      initial_asn?: string;
      /** [Enterprise Customers] First IP address associated with this session. */
      initial_ip?: string;
      /** [Enterprise Customers] First user agent of the device associated with this session. */
      initial_user_agent?: string;
      /** [Enterprise Customers] Last autonomous system number from which this user logged in. */
      last_asn?: string;
      /** [Enterprise Customers] Last IP address from which this user logged in. */
      last_ip?: string;
      /** [Enterprise Customers] Last user agent of the device from which this user logged in. */
      last_user_agent?: string;
    };
    /** [Enterprise Customers] The date and time when the session will expire. */
    expires_at?: string;
    /** [Enterprise Customers] The date and time when the session will expire if idle. */
    idle_expires_at?: string;
    /** [Enterprise Customers] The date and time when the session was last successfully interacted with. */
    last_interacted_at?: string;
    /** [Enterprise Customers] [Limited Early Access] Session Metadata */
    metadata?: {
      [additionalProperties: string]: any;
    };
    /** [Enterprise Customers] [Limited Early Access] This object is defined when the session is created from a session transfer token (Native to Web SSO), undefined otherwise. */
    session_transfer?: {
      /** [Enterprise Customers] This object is defined when the refresh token is created from a session initiated as a result of session transfer (Native to Web SSO), undefined otherwise. */
      parent_refresh_token?: {
        /** [Enterprise Customers] The ID of the parent refresh token from which this session/refresh token was created as a result of a session transfer (Native to Web SSO). */
        id?: string;
        /** [Enterprise Customers] The metadata of the parent refresh token from which this session/refresh token was created as a result of a session transfer (Native to Web SSO). */
        metadata?: {
          [additionalProperties: string]: any;
        };
      };
    };
    /** [Enterprise Customers] The date and time when the session was last updated. */
    updated_at?: string;
    /** [Enterprise Customers] ID of the user which can be used when interacting with other APIs. */
    user_id?: string;
  };
  /** [Private Early Access] Details of the current session transfer token being used to establish Single Sign-On (SSO) from a native application to a web application. */
  session_transfer_token?: {
    /** [Private Early Access] The client identifier of the application that issued the token. */
    client_id: string;
    /** [Private Early Access] Details about the request that issued the token. */
    request: {
      /** [Private Early Access] The Autonomous System Number (ASN) associated with the request that issued the token. */
      asn?: string;
      geoip?: {
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
      /** [Private Early Access] The IP address associated with the request that issued the token. */
      ip: string;
      /** [Private Early Access] The User-Agent string of the device that issued the token. */
      user_agent?: string;
    };
    /** [Private Early Access] The scopes requested when the token was issued. */
    scope: string[];
  };
  /** Login statistics for the current user. */
  stats: {
    /** The number of times this user has logged in. */
    logins_count: number;
  };
  /** Details about the Tenant associated with the current transaction. */
  tenant: {
    /** The name of the tenant. */
    id: string;
  };
  /** Details about the current transaction. */
  transaction?: {
    /** Unique identifier for the transaction. Populated for all browser-based login flows. */
    id?: string;
    /** Any acr_values provided in the original authentication request. */
    acr_values?: string[];
    /** Dynamic Linking ID that allows developers to reference this transaction. */
    linking_id?: string;
    /** The locale to be used for this transaction as determined by comparing the browser's requested languages to the tenant's language settings. */
    locale?: string;
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
    /** The details of a rich authorization request per Section 2 of the Rich Authorization Requests spec at https://datatracker.ietf.org/doc/html/draft-ietf-oauth-rar#section-2. */
    requested_authorization_details?: ({
      /** The type of authorization details as a string. The value of the type field determines the allowable contents of the object which contains it. */
      type: string;
    } & {
      [additionalProperties: string]: any;
    })[];
    /** The scopes requested (if any) when starting this authentication flow. */
    requested_scopes?: string[];
    /** Informs the Authorization Server of the mechanism to be used for returning parameters from the Authorization Endpoint. */
    response_mode?: 'query' | 'fragment' | 'form_post' | 'web_message';
    /** Denotes the kind of credential that Auth0 will return. */
    response_type?: ('code' | 'token' | 'id_token')[];
    /** An opaque arbitrary alphanumeric string your app adds to the initial request that Auth0 includes when redirecting back to your application. */
    state?: string;
    /** The ui_locales provided in the original authentication request. */
    ui_locales?: string[];
    /** Correlation ID can be provided in the initial authentication request when the application redirects to Universal Login. You can use value to correlate logs and requests from your Action code with the user flow. */
    correlation_id?: string;
    /** An object containing shared data across custom Actions for the duration of a transaction. */
    metadata: {
      [additionalProperties: string]: string | number | boolean;
    };
  } & {
    [additionalProperties: string]: any;
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
    /** An an array of authentication factors that the user has enrolled. */
    enrolledFactors?: ({
      /** The type of authentication factor such as `push-notification`, `phone`, `email`, `otp`, `webauthn-roaming` and `webauthn-platform`. */
      type: string;
      /** Additional options describing this instance of the enrolled factor. */
      options?: {
        [additionalProperties: string]: any;
      };
    } & {
      [additionalProperties: string]: any;
    })[];
    /** List of multi-factor authentication (MFA) providers with which the user is enrolled. This array is updated when the user enrolls in MFA and when an administrator resets a user's MFA enrollments. */
    multifactor?: string[];
    /** Contains info retrieved from the identity provider with which the user originally authenticates. Users may also link their profile to multiple identity providers; those identities will then also appear in this array. The contents of an individual identity provider object varies by provider. */
    identities: ({
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
/** The custom prompt ID. */
type PromptId = string;
type PromptOptions = {
  /** Key-value pairs to populate field values (client-side). */
  fields?: {
    [patternProperties: string]: any;
  };
  /** Key-value pairs to inject variables (server-side). */
  vars?: {
    [patternProperties: string]: any;
  };
};
type SAMLAttributeValue = string | number | boolean | null | (string | number | boolean)[];
type SetSAMLAttributeValue = SAMLAttributeValue;
type RenderPromptId = PromptId;
type RenderPromptOptions = PromptOptions;
type TxMetadataValue = string | boolean | number;
interface ValidationAPI {
  /**
   * Throw an error when there is a validation error.
   *
   * @param errorCode A customer defined error code for the validation error.
   *
   * @param errorMessage A customer defined message for the validation error.
   */
  error(errorCode: string, errorMessage: string): PostLoginAPI;
}
interface RulesAPI {
  /**
   * Check whether a Rule with a specific ID has been executed in the current transaction.
   *
   * @param ruleId The Rule ID.
   */
  wasExecuted(ruleId: string): boolean;
}
interface Secrets {
  [secretName: string]: string;
}
interface Configuration {}
interface Event extends PostLoginV3Event {
  /**
   * @private Configuration values associated with this Action.
   */
  readonly configuration: Configuration;
  /**
   * Secret values securely associated with this Action.
   */
  readonly secrets: Secrets;
}
interface AccessAPI {
  /**
   * Mark the current login attempt as denied. This will prevent the end-user from completing
   * the login flow. This will *NOT* cancel other user-related side-effects (such as metadata
   * changes) requested by this Action. The login flow will immediately stop following the
   * completion of this action and no further Actions will be executed.
   *
   * @param reason A human-readable explanation for rejecting the login. This may be presented
   * directly in end-user interfaces.
   */
  deny(reason: string): PostLoginAPI;
}
interface AccessTokenAPI {
  /**
   * Set a custom claim on the Access Token that will be issued upon completion of the login flow.
   *
   * @param key Name of the claim (note that this may need to be a fully-qualified url).
   * @param value The value of the claim.
   */
  setCustomClaim(key: string, value: unknown): PostLoginAPI;
  /**
   * Add a scope on the Access Token that will be issued upon completion of the login flow.
   *
   * @param scope The scope to be added.
   * @throws will throw an error if scope is invalid
   */
  addScope(scope: string): void;
  /**
   * Remove a scope on the Access Token that will be issued upon completion of the login flow.
   *
   * @param scope The scope to be removed.
   * @throws will throw an error if scope is invalid
   */
  removeScope(scope: string): void;
}
interface ChallengeWithOptions {
  additionalFactors?: FactorSelector[];
}
interface EnrollWithOptions {
  additionalFactors?: EnrollmentFactorSelector[];
}
interface AuthenticationAPI {
  /**
   * Request a challenge for multifactor authentication using the supplied factor and optional additional factors.
   *
   * When a multifactor challenge is requested, subsequent Actions will not be run until that challenge has been
   * fulfilled by the user. A user will have satisfied the challenge in any of the following situations:
   *
   * 1. They successfully complete the challenge for the default factor.
   * 2. They successfully complete the challenge for any of the optional factors described in `additionalFactors`.
   *
   * If any of the factors requested has already been challenged successfully in the current transaction, it will
   * be ignored.
   *
   * If a factor is requested is not enabled on the tenant, it will be ignored. If a factor is requested that the user
   * has not enrolled, it will be ignored. If none of the requested factors is enabled or enrolled, the authentication
   * transaction will fail (i.e. login will not complete).
   *
   * _**Note**: This method will result in a factor challenge screen being shown if the user has not already satisfied
   * the requirements of the challenge. If `additionalFactors` are supplied, the user will have the option to
   * select another factor if they choose to._
   *
   * @param factor An object describing the type of factor its options that should be used for the initial challenge.
   * @param options Additional options which can also specify `additionalFactors` as a property. Factor-specific options (for example `otpFallback` for `push-notification`) belong on `factor.options`.
   *
   * @example
   * Challenge with a specific factor:
   * ```js
   * api.authentication.challengeWith({
   *   type: 'phone',
   *   options: { preferredMethod: 'both' }
   * });
   * ```
   *
   * @example
   * Challenge with additional factors:
   * ```js
   * api.authentication.challengeWith({
   *   type: 'otp'
   * }, {
   *   additionalFactors: [{
   *     type: 'push-notification'
   *   }, {
   *     type: 'phone'
   *   }]
   * });
   * ```
   *
   * @example
   * Challenge with push notification and disable OTP fallback:
   * ```js
   * api.authentication.challengeWith({
   *   type: 'push-notification',
   *   options: { otpFallback: false }
   * });
   * ```
   */
  challengeWith(factor: FactorSelector, options?: ChallengeWithOptions): void;
  /**
   * Request a challenge for multifactor authentication using any of the supplied factors (showing a factor selection
   * screen first).
   *
   * When a multifactor challenge is requested, subsequent Actions will not be run until that challenge has been
   * fulfilled by the user. A user will have satisfied the challenge in any of the following situations:
   *
   * 1. They successfully complete the challenge for any of the factors.
   *
   * If any of the factors requested has already been challenged successfully in the current transaction, it will
   * be ignored.
   *
   * If a factor is requested is not enabled on the tenant, it will be ignored. If a factor is requested that the user
   * has not enrolled, it will be ignored. If none of the requested factors is enabled or enrolled, the authentication
   * transaction will fail (i.e. login will not complete).
   *
   * _**Note**: This method will result in the factor selector screen being shown if the user has not already satisfied
   * the requirements of the challenge. If there is a preferred factor, the `api.authentication.challengeWith()` method
   * is preferred. The factor selector screen will not be shown if only one factor is passed in or is valid._
   *
   * @param factors An array of factors.
   */
  challengeWithAny(factors: FactorSelector[]): void;
  /**
   * Request an enrollment for multifactor authentication using the supplied factor and optional additional factors.
   *
   * When a multifactor enrollment is requested, subsequent Actions will not be run until that enrollment has been
   * fulfilled by the user.
   *
   * If any of the factors requested has already been enrolled or challenged successfully in the current transaction, it will
   * be ignored.
   *
   * If a factor that is not enabled in the tenant is requested, it will be ignored.
   * If a factor that the user has already enrolled is requested, it will be ignored.
   * If none of the requested factors is enabled and not enrolled, the authentication
   * transaction will fail (i.e. login will not complete).
   *
   * @param factor An object describing the type of factor that should be used for the initial enrollment prompts and its options.
   * @param options Additional options which can also specify `additionalFactors` as a property.
   *
   * @example
   * Enroll with additional factors:
   * ```js
   * api.authentication.enrollWith({
   *   type: 'otp'
   * }, {
   *   additionalFactors: [{
   *     type: 'push-notification'
   *   }, {
   *     type: 'phone'
   *   }]
   * });
   * ```
   */
  enrollWith(factor: EnrollmentFactorSelector, options?: EnrollWithOptions): void;
  /**
   *
   * Request an enrollment for multifactor authentication using any of the supplied factors (showing a factor selection
   * screen first).
   *
   * When a multifactor enrollment is requested, subsequent Actions will not be run until that enrollment has been
   * fulfilled by the user.
   *
   * If any of the factors requested has already been enrolled successfully in the current transaction, it will
   * be ignored.
   *
   * If a factor that is not enabled in the tenant is requested, it will be ignored.
   * If a factor that the user has already enrolled is requested, it will be ignored.
   * If none of the requested factors is enabled and not enrolled, the authentication
   * transaction will fail (i.e. login will not complete).
   *
   * _**Note**: If there is a preferred factor, the `api.authentication.enrollWith()` method
   * is preferred. The factor selector screen will not be shown if only one factor is passed in or is valid._
   *
   * @param factors An array of additional factors.
   */
  enrollWithAny(factors: EnrollmentFactorSelector[]): void;
  /**
   * Indicate that a custom authentication method has been completed in the current
   * session. This method will then be available in the `event.authentication.methods`
   * array in subsequent logins.
   *
   * **IMPORTANT**: This API is only available from within the `onContinuePostLogin`
   * function for `PostLogin` Actions. In other words, this may be used to record the
   * completion of a custom authentication method after redirecting the user via
   * `api.redirect.sendUserTo()`.
   *
   * @param provider_url An `http:` or `https:` URL that uniquely represents the completed
   * authentication method.
   */
  recordMethod(provider_url: string): PostLoginAPI;
  /**
   * Change the primary user for the login transaction.
   *
   * In scenarios that require linking users, the user identity used to initiate the login may no longer
   * exist as a discrete user. That identity may now be a secondary identity of an existing user. In
   * such situations, the `setPrimaryUser()` function can be used to indicate that the subject of the
   * login should be changed.
   *
   * **IMPORTANT**: Insecurely linking accounts can allow malicious actors to access legitimate
   * user accounts.
   *
   * **IMPORTANT**: The identity used to authenticate the login _must_ be among the secondary identities
   * of the user referenced by `primary_user_id`. The login will fail and tokens will not be issued
   * otherwise.
   *
   * @param primary_user_id The user ID of the user for whom tokens should be issued (the `sub` claim).
   */
  setPrimaryUser(primary_user_id: string): void;
}
interface IdTokenAPI {
  /**
   * Set a custom claim on the ID Token that will be issued upon completion of the login flow.
   *
   * @param key Name of the claim (note that this may need to be a fully-qualified url).
   * @param value The value of the claim.
   */
  setCustomClaim(key: string, value: unknown): PostLoginAPI;
}
type DuoMultifactor = {
  provider: 'duo';
} & RequireMultifactorAuth;
interface EnableMultifactorOptions<T> {
  /**
   * When provider is set to `google-authenticator` or `duo`, the user is prompted for MFA once
   * every 30 days. When provider is set to `guardian`, the MFA prompt displays the enrollment
   * checkbox for users to choose whether or not to enroll. Defaults to `false`. To learn more,
   * read [Customize Multi-Factor Authentication Pages](https://auth0.com/docs/secure/multi-factor-authentication/customize-mfa).
   */
  allowRememberBrowser?: boolean;
  /**
   * Additional options to configure the challenge, only available for the `duo` provider.
   */
  providerOptions?: T extends 'duo' ? DuoMultifactor['providerOptions'] : never;
}
interface MultifactorAPI {
  /**
   * Enable multifactor authentication for this login flow. When enabled, users must complete the
   * configured multifactor challenge. The actual multifactor challenge will be deferred to the
   * end of the login flow.
   *
   * @param provider The name of the multifactor provider to use or the value `"any"` to use any
   * of the configured providers.
   * @param options Additional options for enabling multifactor challenges.
   */
  enable<T extends RequireMultifactorAuth['provider']>(
    provider: T,
    options?: EnableMultifactorOptions<T>
  ): PostLoginAPI;
}
interface PromptAPI {
  /**
   * Renders a custom prompt.
   *
   * @param promptId The prompt ID.
   * @param promptOptions The render options.
   */
  render(promptId: RenderPromptId, promptOptions?: RenderPromptOptions): void;
}
interface TokenCreationOptions {
  /**
   * Number of seconds before this token will expire
   *
   * @default 900 15 minutes.
   */
  expiresInSeconds?: number;
  /**
   * The data intended to be passed to the target of the redirect and whose authenticity
   * and integrity must be provable.
   */
  payload: {
    [key: string]: unknown;
  };
  /**
   * A secret that will be used to sign a JWT that is shared with the redirect target. The
   * secret value should be stored as a **secret** and retrieved using
   * `event.secrets['<secret_name>']`.
   */
  secret: string;
}
interface ValidateSessionTokenOptions {
  secret: string;
  /**
   * The name of the query or body parameter that was sent to the /continue endpoint.
   *
   * @default 'session_token'
   */
  tokenParameterName?: string;
}
interface SendUserToOptions {
  /**
   * An object representing additional query string parameters that should be appended to
   * the redirect URL.
   */
  query?: {
    [param: string]: string;
  };
}
interface RedirectAPI {
  /**
   * Create a session token suitable for using as a query string parameter redirect target (via `sendUserTo`)
   * that contains data whose authenticity must be provable by the target endpoint. The target endpoint
   * can verify the authenticity and integrity of the data by checking the JWT's signature
   * using a shared secret.
   *
   * The shared secret should be stored as a **secret** of the Action and will be readable at
   * `event.secrets['<secret_name>']`.
   *
   * @param options Configure how sensitive data is encoded into the query parameters of the
   * resulting url.
   *
   * @returns A JWT string.
   */
  encodeToken(options: TokenCreationOptions): string;
  /**
   * Cause the login pipeline to trigger a browser redirect to the target `url` immediately after
   * this action completes. The `createUrl` helper method is provided to simplify encoding
   * data as a query parameter in the target `url` such that the data's authenticity and
   * integrity can be verified by the target endpoint.
   *
   * @param baseUrl The url to which to redirect the user.
   */
  sendUserTo(url: string, options?: SendUserToOptions): PostLoginAPI;
  /**
   * Indicates if the current transaction is eligibile for a user redirect. Certain protocols such
   * as `oauth2-resource-owner`, `oauth2-refresh-token` do not support
   * redirecting the user. A request with `prompt=none` is also not eligible for a redirect.
   *
   * @deprecated The `canRedirect` method should not be relied upon to determine whether a
   * redirect is allowed or not in this flow. Instead, it is recommended that clients
   * appropriately handle any `interaction_required` errors arising from a redirect requested
   * in a non-interactive flow.
   *
   * @returns A boolean indicating if the current transaction is eligible for redirects.
   */
  canRedirect(): boolean;
  /**
   * Retrieve the data encoded in a JWT token passed to the `/continue` endpoint while verifying
   * the authenticity and integrity of that data.
   *
   * @param options Options for retrieving the data encoded in a JWT token passed to the
   * `/continue` endpoint following a rediret.
   *
   * @returns The payload of the JWT token.
   */
  validateToken(options: ValidateSessionTokenOptions): any;
}
interface RefreshTokenAPI {
  /**
   * [Enterprise Customers] Revoke the current user refresh token and mark the current refresh token exchange attempt as denied. This will prevent
   * the end-user from completing the refresh token exchange flow and revoke the currently used refresh token.
   * The refresh token exchange flow will immediately stop following the completion of this action and no further Actions will be executed.
   *
   * This method can be used only during Refresh Token Exchange flow, when `event.transaction.protocol === "oauth2-refresh-token"`.
   *
   * @param reason A human-readable explanation for rejecting the refresh token exchange. This may be presented
   * directly in end-user interfaces.
   */
  revoke(reason: string): void;
  /**
   * [Enterprise Customers] Sets a new absolute expiration time for the current refresh token.
   * The expiration cannot be set higher than the maximum refresh token lifetime set in the settings.
   * When called multiple times, the earliest expiration time will be used.
   *
   * @param absolute Required, the new absolute expiration time in milliseconds since the unix epoch, after which the Refresh Token will be considered invalid.
   */
  setExpiresAt(absolute: number): void;
  /**
   * [Enterprise Customers] Sets a new idle expiration time for the current refresh token.
   * The expiration cannot be set higher than the maximum absolute refresh token lifetime set in the settings.
   * When called multiple times, the earliest expiration time will be used.
   *
   * @param inactivity Required, the new idle inactivity time in milliseconds since the unix epoch, after which the Refresh Token will be considered invalid
   * if it is not used during this period.
   */
  setIdleExpiresAt(inactivity: number): void;
}
interface SAMLResponseAPI {
  /**
   * Set attributes on the SAML assertion being issued to the authenticated user.
   *
   * @param attribute The SAML attribute to be set.
   * @param value The value of the SAML claim. Setting this value to `null` or
   * `undefined` will remove the claim from the assertion.
   */
  setAttribute(attribute: string, value: SetSAMLAttributeValue): void;
  /**
   * Audience of the SAML assertion.
   * Default is issuer on SAMLRequest.
   */
  setAudience(audience: string): void;
  /**
   * Recipient of the SAML assertion (SubjectConfirmationData).
   * Default is AssertionConsumerUrl on SAMLRequest or callback URL if no SAMLRequest was sent.
   */
  setRecipient(recipient: string): void;
  /**
   * Whether or not a UPN claim should be created. Default is true.
   */
  setCreateUpnClaim(createUpnClaim: boolean): void;
  /**
   * If true (default), for each claim that is not mapped to the common profile, Auth0 passes through those in the output assertion.
   * If false, those claims won't be mapped.
   */
  setPassthroughClaimsWithNoMapping(passthroughClaimsWithNoMapping: boolean): void;
  /**
   * If passthroughClaimsWithNoMapping is true and this is false (default), for each claim not mapped to the common profile Auth0 adds a prefix `http://schema.auth0.com`.
   * If true it will pass through the claim as-is.
   */
  setMapUnknownClaimsAsIs(mapUnknownClaimsAsIs: boolean): void;
  /**
   * If true (default), it adds more information in the token such as the provider (Google, ADFS, AD, etc.) and the access token, if available.
   */
  setMapIdentities(mapIdentities: boolean): void;
  /**
   * Signature algorithm to sign the SAML assertion or response.
   * Default is rsa-sha256.
   */
  setSignatureAlgorithm(signatureAlgorithm: 'rsa-sha256'): void;
  /**
   * @deprecated Use rsa-sha256 instead, rsa-sha1 is not recommended.
   */
  setSignatureAlgorithm(signatureAlgorithm: 'rsa-sha1'): void;
  /**
   * Digest algorithm to calculate digest of the SAML assertion or response.
   * Default is sha256.
   */
  setDigestAlgorithm(digestAlgorithm: 'sha256'): void;
  /**
   * @deprecated Use 'sha256' instead, 'sha1' is not recommended.
   */
  setDigestAlgorithm(digestAlgorithm: 'sha1'): void;
  /**
   * Destination of the SAML response. If not specified, it will be AssertionConsumerUrl of SAMLRequest or callback URL if there was no SAMLRequest.
   */
  setDestination(destination: string): void;
  /**
   * Expiration of the token.
   * Default is 3600 seconds (1 hour).
   */
  setLifetimeInSeconds(lifetimeInSeconds: number): void;
  /**
   * Whether or not the SAML response should be signed.
   * By default the SAML assertion will be signed, but not the SAML response.
   * If true, SAML Response will be signed instead of SAML assertion.
   * Default to false.
   */
  setSignResponse(signResponse: boolean): void;
  /**
   * Default is urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified.
   */
  setNameIdentifierFormat(nameIdentifierFormat: string): void;
  /**
   * Auth0 will try each of the attributes of this array in order.
   * If one of them has a value, it will use that for the Subject/NameID.
   *
   * The order is:
   *   - http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier (mapped from user_id),
   *   - http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress (mapped from email),
   *   - http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name (mapped from name).
   */
  setNameIdentifierProbes(nameIdentifierProbes: string[]): void;
  /**
   * Default is urn:oasis:names:tc:SAML:2.0:ac:classes:unspecified.
   */
  setAuthnContextClassRef(authnContextClassRef: string): void;
  /**
   * Optionally indicates the public key certificate used to validate SAML requests.
   * If set, SAML requests will be required to be signed.
   * A sample value would be "-----BEGIN CERTIFICATE-----\nMIIC8jCCAdqgAwIBAgIJObB6jmhG0QIEMA0GCSqGSIb3DQEBBQUAMCAxHjAcBgNV\n[..all the other lines..]-----END CERTIFICATE-----\n".
   */
  setSigningCert(signingCert: string): void;
  /**
   * When set to true, we infer the NameFormat based on the attribute name. NameFormat values are urn:oasis:names:tc:SAML:2.0:attrname-format:uri, urn:oasis:names:tc:SAML:2.0:attrname-format:basic and urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified.
   * If set to false, the attribute NameFormat is not set in the assertion.
   * Default is true.
   */
  setIncludeAttributeNameFormat(includeAttributeNameFormat: boolean): void;
  /**
   * When set to true, we infer the xs:type of the element. Types are xs:string, xs:boolean, xs:double and xs:anyType.
   * When set to false all xs:type are xs:anyType.
   * Default is true.
   */
  setTypedAttributes(typedAttributes: boolean): void;
  /**
   * Optionally specify a certificate used to encrypt the SAML assertion.
   * The certificate should be obtained from the service provider.
   * Both the certificate and public key must be specified.
   * A sample value would be "-----BEGIN CERTIFICATE-----\nMIIC8jCCAdqgAwIBAgIJObB6jmhG0QIEMA0GCSqGSIb3DQEBBQUAMCAxHjAcBgNV\n[..all the other lines..]-----END CERTIFICATE-----\n".
   */
  setEncryptionCert(encryptionCert: string): void;
  /**
   * Optionally specify a public key used to encrypt the SAML assertion.
   * The public key should be obtained from the service provider.
   * Both the public key and certificate must be specified.
   * A sample value would be "-----BEGIN PUBLIC KEY-----\nnMIIC8jCCAdqgAwIBAgIJObB6jmhG0QIEMA0GCSqGSIb3DQEBBQUAMCAxHjAcBgNV\n[..all the other lines..]-----END PUBLIC KEY-----\n".
   */
  setEncryptionPublicKey(encryptionPublicKey: string): void;
  /**
   * By default, Auth0 will use the private/public key pair assigned to your tenant to sign SAML responses or assertions.
   * For very specific scenarios, you might wish to provide your own certificate and private key.
   *
   * Both the certificate and private key must be specified.
   * A sample value would be "-----BEGIN CERTIFICATE-----\nMIIC8jCCAdqgAwIBAgIJObB6jmhG0QIEMA0GCSqGSIb3DQEBBQUAMCAxHjAcBgNV\n[..all the other lines..]-----END CERTIFICATE-----\n".
   */
  setCert(cert: string): void;
  /**
   * By default, Auth0 will use the private/public key pair assigned to your tenant to sign SAML responses or assertions.
   * For very specific scenarios, you might wish to provide your own certificate and private key.
   *
   * Since this private key is sensitive, **we recommend using the Add Secret functionality of Actions**.
   * See here for more details: https://auth0.com/docs/customize/actions/write-your-first-action#add-a-secret
   *
   * Both the certificate and private key must be specified.
   * A sample value would be "-----BEGIN PRIVATE KEY-----\nnMIIC8jCCAdqgAwIBAgIJObB6jmhG0QIEMA0GCSqGSIb3DQEBBQUAMCAxHjAcBgNV\n[..all the other lines..]-----END PRIVATE KEY-----\n".
   */
  setKey(key: string): void;
  /**
   * Optionally specify a RelayState used to return to service provider
   */
  setRelayState(relayState: string): void;
  /**
   * Optionally specify the issuer of the SAML assertion.
   * Default is urn:auth0:TENANT
   */
  setIssuer(issuer: string): void;
}
interface SessionRevocationOptions {
  /** Default to false. If true, the system ends the session and keeps the refresh tokens. The application may continue to get access tokens for the duration of the refresh token lifetime. */
  preserveRefreshTokens?: boolean;
}
interface SessionAPI {
  /**
   * [Enterprise Customers] Revoke the current user session and mark the current login attempt as denied. This will prevent
   * the end-user from completing the login flow and revoke their session. The login flow will immediately
   * stop following the completion of this action and no further Actions will be executed.
   *
   * @param reason A human-readable explanation for rejecting the login. This may be presented
   * directly in end-user interfaces.
   *
   * @param options
   *
   * @example
   * Revoke the session while preserving refresh tokens:
   * ```js
   * api.session.revoke('reason', { preserveRefreshTokens: true });
   * ```
   */
  revoke(reason: string, options?: SessionRevocationOptions): void;
  /**
   * [Enterprise Customers] Sets a new absolute expiration time for the current session.
   * The expiration cannot be set higher than the maximum session lifetime set in the tenant settings.
   * When called multiple times, the earliest expiration time will be used.
   *
   * @param absolute Required, the new absolute expiration time in milliseconds since the unix epoch, after which the Session will be considered invalid.
   */
  setExpiresAt(absolute: number): void;
  /**
   * [Enterprise Customers] Sets a new idle expiration time for the current session.
   * The expiration cannot be set higher than the maximum absolute session lifetime set in the tenant settings.
   * When called multiple times, the earliest expiration time will be used.
   *
   * @param inactivity Required, the new inactivity expiration time in milliseconds since the unix epoch, after which the Session will be considered invalid if there
   * is no user interaction during this period.
   */
  setIdleExpiresAt(inactivity: number): void;
  /**
   * [Enterprise Customers] [Early Access] Sets the cookie mode for the current session, allowing it to be either 'persistent' or 'non-persistent' (ephemeral).
   * This determines how the session cookie is handled in the browser:
   * - 'persistent': The cookie will be stored until it expires or is deleted by the user.
   * - 'non-persistent' (ephemeral): The cookie will be deleted when the browser is closed.
   *
   * If multiple setCookieMode invocations are made, only the last one will take effect. In case 'non-persistent' is set, the cookie will be deleted when the browser is closed, however, the session itself will remain valid until its absolute or idle expiration time is reached
   * or the session is revoked through our available APIs. For more information on cookie modes, please refer to our documentation.
   *
   * @param mode Required, the cookie mode for the current session.
   * Can be either 'persistent' or 'non-persistent' (ephemeral).
   */
  setCookieMode(mode: 'persistent' | 'non-persistent'): void;
  /**
   * [Enterprise Customers] [Limited Early Access] Sets a key value pair in the metadata object of the current session.
   *
   * @param key Required, the key to set in the metadata object.
   * @param value Required, the value to set for the key in the metadata object, null values will delete the provided metadata key.
   * @throws will throw an error if the resulting metadata object is invalid.
   */
  setMetadata(key: string, value: string | null): void;
  /**
   * [Enterprise Customers] [Limited Early Access] Deletes a key in the metadata object of the current session.
   *
   * @param key Required, the key to delete from the metadata object.
   */
  deleteMetadata(key: string): void;
  /**
   * [Enterprise Customers] [Limited Early Access] Deletes all keys from the metadata object of the current session.
   *
   */
  evictMetadata(): void;
}
interface TransactionAPI {
  /**
   * Store or update the value in the transaction metadata for a specified key.
   *
   * Metadata modified using this method is updated in real-time in the
   * `event.transaction.metadata` object.
   *
   * @param key The key of the property to be set.
   * @param value The value of the property. This may be set to `null` to remove the
   * metadata property.
   */
  setMetadata(key: string, value: TxMetadataValue | null): void;
}
interface UserAPI {
  /**
   * Set application-specific metadata for the user that is logging in.
   *
   * Note: This method should not be used in callbacks. Invoking this method won't update the metadata immediately.
   * You can call this several times throughout multiple actions of the same flow and the engine will aggregate the
   * changes and update the metadata at once before the flow is completed. This function works only with metadata that
   * are in the object format.
   *
   * @param key The metadata property to be set.
   * @param value The value of the metadata property. This may be set to `null` to remove the
   * metadata property.
   */
  setAppMetadata(key: string, value: unknown): PostLoginAPI;
  /**
   * Set general metadata for the user that is logging in.
   *
   * Note: This method should not be used in callbacks. Invoking this method won't update the metadata immediately.
   * You can call this several times throughout multiple actions of the same flow and the engine will aggregate the
   * changes and update the metadata at once before the flow is completed. This function works only with metadata that
   * are in the object format.
   *
   * @param key The metadata property to be set.
   * @param value The value of the metadata property. This may be set to `null` to remove the
   * metadata property.
   */
  setUserMetadata(key: string, value: unknown): PostLoginAPI;
}
/**
 * Methods and utilities to help change the behavior of the login flow.
 */
interface PostLoginAPI {
  /**
   * Modify the access of the user that is logging in, such as rejecting the login attempt.
   */
  readonly access: AccessAPI;
  /**
   * Request changes to the access token being issued.
   */
  readonly accessToken: AccessTokenAPI;
  /**
   * Request changes to the authentication state of the current user's session.
   */
  readonly authentication: AuthenticationAPI;
  /**
   * Request changes to the ID token being issued.
   */
  readonly idToken: IdTokenAPI;
  /**
   * Set or remove the requirement for multifactor authentication on the login attempt.
   */
  readonly multifactor: MultifactorAPI;
  /**
   * Configure and initiate external redirects.
   */
  readonly redirect: RedirectAPI;
  /**
   * Make changes to the metadata of the user that is logging in.
   */
  readonly user: UserAPI;
  /**
   * Make changes to the cache.
   */
  readonly cache: CacheAPI;
  /**
   * Configure custom SAML configurations and attributes.
   */
  readonly samlResponse: SAMLResponseAPI;
  /**
   * Prevent user from logging in by throwing a validation error.
   */
  readonly validation: ValidationAPI;
  /**
   * Identify if a rule has been executed in the current transaction.
   */
  readonly rules: RulesAPI;
  /**
   * Renders a custom prompt.
   */
  readonly prompt: PromptAPI;
  /**
   * Request changes to the current user's refresh token.
   */
  readonly refreshToken: RefreshTokenAPI;
  /**
   * Request changes to the current user's session.
   */
  readonly session: SessionAPI;
  /**
   * Make changes to the transaction.
   */
  readonly transaction: TransactionAPI;
}
interface PostLoginAction {
  (event: Event, api: PostLoginAPI): Promise<void>;
}
export type {
  Configuration,
  Event,
  PostLoginAPI,
  PostLoginAction,
  PromptAPI,
  RefreshTokenAPI,
  Secrets,
  SessionAPI,
  TransactionAPI,
};
