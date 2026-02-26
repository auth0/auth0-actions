/** Multifactor */
type Multifactor =
  | {
      /** When provider is set to `google-authenticator` or `duo`, the user is prompted for MFA once every 30 days. When provider is set to `guardian`, the MFA prompt displays the enrollment checkbox for users to choose whether or not to enroll. Defaults to `false`. To learn more, read [Customize Multi-Factor Authentication Pages](https://auth0.com/docs/secure/multi-factor-authentication/customize-mfa). */
      allowRememberBrowser?: boolean;
      /** User the provider setting to specify whether to force MFA, and which factor you use */
      provider: 'none' | 'guardian' | 'google-authenticator' | 'any';
    }
  | {
      /** When provider is set to `google-authenticator` or `duo`, the user is prompted for MFA once every 30 days. When provider is set to `guardian`, the MFA prompt displays the enrollment checkbox for users to choose whether or not to enroll. Defaults to `false`. To learn more, read [Customize Multi-Factor Authentication Pages](https://auth0.com/docs/secure/multi-factor-authentication/customize-mfa). */
      allowRememberBrowser?: boolean;
      /** User the provider setting to specify whether to force MFA, and which factor you use */
      provider: 'duo';
      providerOptions?: {
        /** This is the API hostname value from your Duo account. */
        host: string;
        /** This is the Client ID (previously Integration key) value from your Duo account. */
        ikey: string;
        /** This is the Client secret (previously Secret key) value from your Duo account. */
        skey: string;
        /** Use some attribute of the profile as the username in DuoSecurity. This is also useful if you already have your users enrolled in Duo. */
        username?: string;
      };
    };
/** PostLoginV2Event */
type PostLoginV2Event = {
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
  };
  /** An object containing information describing the authorization granted to the user who is logging in. */
  authorization?: {
    /** An array containing the names of a user's assigned roles. */
    roles: string[];
  };
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
    /** List of multi-factor authentication (MFA) providers with which the user is enrolled. This array is updated when the user enrolls in MFA and when an administrator resets a user's MFA enrollments. */
    multifactor?: string[];
  } & {
    [additionalProperties: string]: any;
  };
};
interface InternalCommandAddError {
  type: 'error';
  code: 'MaxSideEffectsExceeded';
}
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
interface Event extends PostLoginV2Event {
  /**
   * @private Configuration values associated with this Action.
   */
  configuration: Configuration;
  /**
   * Secret values securely associated with this Action.
   */
  secrets: Secrets;
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
interface EnableMultifactorOptions {
  /**
   * When provider is set to `google-authenticator` or `duo`, the user is prompted for MFA once
   * every 30 days. When provider is set to `guardian`, the MFA prompt displays the enrollment
   * checkbox for users to choose whether or not to enroll. Defaults to `false`. To learn more,
   * read [Customize Multi-Factor Authentication Pages](https://auth0.com/docs/secure/multi-factor-authentication/customize-mfa).
   */
  allowRememberBrowser?: boolean;
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
  enable(provider: Multifactor['provider'], options?: EnableMultifactorOptions): PostLoginAPI;
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
  setAppMetadata(key: string, value: unknown): PostLoginAPI;
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
  setUserMetadata(key: string, value: unknown): PostLoginAPI;
}
/**
 * Methods and utilities to help change the behavior of the login flow.
 */
interface PostLoginAPIWithoutRedirect {
  /**
   * Modify the access of the user that is logging in, such as rejecting the login attempt.
   */
  readonly access: AccessAPI;
  /**
   * Request changes to the access token being issued.
   */
  readonly accessToken: AccessTokenAPI;
  /**
   * Store and retrieve data that persists across executions.
   */
  readonly cache: CacheAPI;
  /**
   * Request changes to the ID token being issued.
   */
  readonly idToken: IdTokenAPI;
  /**
   * Set or remove the requirement for multifactor authentication on the login attempt.
   */
  readonly multifactor: MultifactorAPI;
  /**
   * Make changes to the metadata of the user that is logging in.
   */
  readonly user: UserAPI;
}
/**
 * Methods and utilities to help change the behavior of the login flow.
 */
interface PostLoginAPI extends PostLoginAPIWithoutRedirect {
  /**
   * Configure and initiate external redirects.
   */
  readonly redirect: RedirectAPI;
}
interface PostLoginAction {
  (event: Event, api: PostLoginAPI): Promise<void>;
}
export type { Configuration, Event, PostLoginAPI, PostLoginAction, Secrets };
