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
/**
 * PasswordResetPostChallengeV1Event
 *
 * Event Object for the Password Reset Post Challenge
 */
type PasswordResetPostChallengeV1Event = {
  /** Details about authentication obtained during the password reset flow. */
  authentication: {
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
    /** Supplemental risk assessment. This is available only if the Akamai Integration is enabled and Akamai forwards the headers for the transaction. */
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
  } & {
    [additionalProperties: string]: any;
  };
  /** An object containing information describing the authorization granted to the user who is logging in. */
  authorization: {
    /** An array containing the names of a user's assigned roles. */
    roles: string[];
  };
  /** Information about the Client with which this password reset transaction was initiated. */
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
  /** Details about the request that initiated the transaction. */
  request: {
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
  transaction: {
    /** Correlation ID can be provided in the initial authentication request when the application redirects to Universal Login. You can use value to correlate logs and requests from your Action code with the user flow. */
    correlation_id?: string;
    /** The locale to be used for this transaction as determined by comparing the browser's requested languages to the tenant's language settings. */
    locale: string;
    /** Hint to the Authorization Server about the login identifier the End-User might use to log in (if necessary). */
    login_hint?: string;
    /** An opaque arbitrary alphanumeric string your app adds to the initial request that Auth0 includes when redirecting back to your application. */
    state?: string;
    /** The ui_locales provided in the original authentication request. */
    ui_locales: string[];
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
    /** An array of authentication factors that the user has enrolled. Empty array means the user has no enrolled factors.  If enrolledFactors is undefined, the system was unable fetch the information, the user may or may not have enrolled factors. */
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
    /** Contains info retrieved from the identity provider with which the user originally authenticated. Users may also link their profile to multiple identity providers; those identities will then also appear in this array. The contents of an individual identity provider object varies by provider. */
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
interface InternalCommandAddError {
  type: 'error';
  code: 'MaxSideEffectsExceeded';
}
type RenderPromptId = PromptId;
type RenderPromptOptions = PromptOptions;
type CacheWriteErrorCode =
  | InternalCommandAddError['code']
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
interface Secrets {
  [secretName: string]: string;
}
interface Configuration {}
interface Event extends PasswordResetPostChallengeV1Event {
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
   * Mark the current password reset attempt as denied. This will prevent the end-user from completing
   * the password reset flow. This will *NOT* cancel other user-related side-effects
   * requested by this Action. The password reset flow will immediately stop following the
   * completion of this action and no further Actions will be executed.
   *
   * @param reason A human-readable explanation for rejecting the password reset. This may be presented
   * directly in end-user interfaces.
   */
  deny(reason: string): void;
}
interface ChallengeWithOptions {
  additionalFactors?: FactorSelector[];
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
   * @param options Additional options which can also specify `additionalFactors` as a property.
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
   * Cause the password reset pipeline to trigger a browser redirect to the target `url` immediately after
   * this action completes. The `createUrl` helper method is provided to simplify encoding
   * data as a query parameter in the target `url` such that the data's authenticity and
   * integrity can be verified by the target endpoint.
   *
   * @param baseUrl The url to which to redirect the user.
   */
  sendUserTo(url: string, options?: SendUserToOptions): void;
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
interface ResultUrlOptions {
  /**
   * The query parameters to include in the URL.
   */
  query?: Record<string, string>;
}
interface TransactionAPI {
  /**
   * Set the URL that the user should be redirected to after the password reset.
   *
   * @param url The URL to redirect the user to.
   */
  setResultUrl(url: string, options?: ResultUrlOptions): void;
}
/**
 * Methods and utilities to help change the behavior of the password reset flow.
 */
interface PasswordResetPostChallengeAPI {
  /**
   * Modify the access of the user that is attempting to reset their password.
   */
  readonly access: AccessAPI;
  /**
   * Request changes to the authentication state of the current user's session.
   */
  readonly authentication: AuthenticationAPI;
  /**
   * Configure and initiate external redirects.
   */
  readonly redirect: RedirectAPI;
  /**
   * Make changes to the cache.
   */
  readonly cache: CacheAPI;
  /**
   * Renders a custom prompt.
   */
  readonly prompt: PromptAPI;
  /**
   * Configure the transaction.
   */
  readonly transaction: TransactionAPI;
}
interface PasswordResetPostChallengeAction {
  (event: Event, api: PasswordResetPostChallengeAPI): Promise<void>;
}
export type {
  Configuration,
  Event,
  PasswordResetPostChallengeAPI,
  PasswordResetPostChallengeAction,
  Secrets,
};
