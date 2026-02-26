/** PostLoginV1Event */
type PostLoginV1Event = {
  accessToken: {
    customClaims: {
      [additionalProperties: string]: any;
    };
    scope: string[];
  };
  actor: {
    /** The ASN (autonomous system number) of the user-agent making the request. */
    asn?: string;
    /** The body of the POST request made to the authorization endpoint. */
    body?: {
      [additionalProperties: string]: any;
    };
    geoIp?: {
      city_name?: string;
      continent_code?: string;
      country_code?: string;
      country_code3?: string;
      country_name?: string;
      latitude?: number;
      longitude?: number;
      subdivision_code?: string;
      subdivision_name?: string;
      time_zone?: string;
    } & {
      [additionalProperties: string]: any;
    };
    /** The hostname that is being used for the authentication flow. */
    hostname?: string;
    /** The originating IP address of request. */
    ip: string;
    /** The language requested by the browser. */
    language?: string;
    /** The HTTP method used for the request */
    method: string;
    /** The query string parameters sent to the authorization request. */
    query: {
      [additionalProperties: string]: any;
    };
    userAgent?: string;
  };
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
    /** The client id of the application to which the user is logging in. */
    id: string;
    /** An object for holding other application properties. */
    metadata: {
      [additionalProperties: string]: string;
    };
    /** The name of the application (as defined in the Dashboard). */
    name: string;
  };
  command?:
    | {
        /** Deny the authentication request. */
        type: 'deny';
        /** The message that will appear to the user who is being denied. */
        message: string;
        /** The reason why an authentication request is being denied. */
        reason: string;
      }
    | {
        /** Perform a redirect. */
        type: 'redirect';
        /** A url specifying where Auth0 will redirect the user. */
        url: string;
      }
    | {
        /** Trigger MFA */
        type: 'multifactor';
        allowRememberBrowser?: boolean;
        provider: string;
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
  idToken: {
    customClaims: {
      [additionalProperties: string]: any;
    };
    scope: string[];
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
  protocol: (
    | 'oidc-basic-profile'
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
    | 'delegation'
    | 'redirect-callback'
  ) &
    string;
  stats: {
    /** The number of times this user has logged in. */
    loginsCount: number;
  };
  /** Details about the Tenant associated with the current transaction. */
  tenant: {
    /** The name of the tenant. */
    id: string;
  };
  user: {
    /** (unique) User's unique identifier. */
    id: string;
    /** Custom fields that store info about a user that influences the user's access, such as support plan, security roles, or access control groups. */
    appMetadata: {
      [additionalProperties: string]: any;
    };
    /** Timestamp indicating when the user profile was first created. */
    createdAt: string;
    /** (unique) User's email address. */
    email?: string;
    /** Indicates whether the user has verified their email address. */
    emailVerified: boolean;
    /** An an array of the authentication factors defined by within the current tenant. */
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
    /** User's famiky name. */
    familyName?: string;
    /** User's given name. */
    givenName?: string;
    /** Contains info retrieved from the identity provider with which the user originally authenticates. Users may also link their profile to multiple identity providers; those identities will then also appear in this array. The contents of an individual identity provider object varies by provider. */
    identities: ({
      /** The API Access Token to be used with the provider */
      accessToken?: string;
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
      userId?: string;
    } & {
      [additionalProperties: string]: any;
    })[];
    /** Timestamp indicating the last time the user's password was reset/changed. At user creation, this field does not exist. This property is only available for Database connections. */
    lastPasswordResetAt?: string;
    /** List of multi-factor authentication (MFA) providers with which the user is enrolled. This array is updated when the user enrolls in MFA and when an administrator resets a user's MFA enrollments. */
    multifactor?: string[];
    /** User's full name. */
    name?: string;
    /** User's nickname. */
    nickname?: string;
    /** User's phone number. */
    phoneNumber?: string;
    /** Indicates whether the user has verified their phone number. */
    phoneNumberVerified?: boolean;
    /** URL pointing to the [user's profile picture](https://auth0.com/docs/users/change-user-picture). */
    picture?: string;
    /** Timestamp indicating when the user's profile was last updated/modified. */
    updatedAt: string;
    /** Custom fields that store info about a user that does not impact what they can or cannot access, such as work address, home address, or user preferences. */
    userMetadata: {
      [additionalProperties: string]: any;
    };
    /** (unique) User's username. */
    username?: string;
  } & {
    [additionalProperties: string]: any;
  };
} & {
  [additionalProperties: string]: any;
};
/** PostLoginV1Result */
type PostLoginV1Result = {
  accessToken?: {
    /** A map of custom claims to be added to the token. The claim keys should take the form of an HTTPS URI. */
    customClaims?: {
      [additionalProperties: string]: any;
    };
    /** A list of scopes to be included in the token. */
    scope?: string[];
  };
  command?:
    | {
        /** Deny the authentication request. */
        type: 'deny';
        /** The message that will appear to the user who is being denied. */
        message: string;
        /** The reason why an authentication request is being denied. */
        reason: string;
      }
    | {
        /** Perform a redirect. */
        type: 'redirect';
        /** A url specifying where Auth0 will redirect the user. */
        url: string;
      }
    | {
        /** Trigger MFA */
        type: 'multifactor';
        allowRememberBrowser?: boolean;
        provider: string;
      };
  idToken?: {
    /** A map of custom claims to be added to the token. The claim keys should take the form of an HTTPS URI. */
    customClaims?: {
      [additionalProperties: string]: any;
    };
    /** A list of scopes to be included in the token. */
    scope?: string[];
  };
  user?: {
    /** Custom fields that store info about a user that influences the user's access, such as support plan, security roles, or access control groups. */
    appMetadata?: {
      [additionalProperties: string]: any;
    };
    /** Custom fields that store info about a user that does not impact what they can or cannot access, such as work address, home address, or user preferences. */
    userMetadata?: {
      [additionalProperties: string]: any;
    };
  };
};
interface Event extends PostLoginV1Event {}
interface Secrets {
  [secretName: string]: string;
}
interface Context {
  secrets: Secrets;
}
interface Result extends PostLoginV1Result {}
interface PostLoginAction {
  (event: Event, context: Context): Promise<Result | undefined>;
}
export type { Context, Event, PostLoginAction, Result, Secrets };
