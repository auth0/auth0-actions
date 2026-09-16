/** CustomTokenExchangeV1Event */
type CustomTokenExchangeV1Event = {
  /** Information about the Client with which this transaction was initiated. */
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
  /** Details about the resource server to which the access is being requested. */
  resource_server: {
    /** The identifier of the resource server. For example: `https://your-api.example.com`. */
    identifier: string;
  };
  /** Details about the Tenant associated with the current transaction. */
  tenant: {
    /** The name of the tenant. */
    id: string;
  };
  /** Details about the current custom token exchange transaction. */
  transaction: {
    /** The actor token provided in the token exchange request. */
    actor_token?: string;
    /** The type of the actor token provided in the token exchange request. */
    actor_token_type?: string;
    /** The user represented by the actor token. This will only be present if the actor_token_type is urn:ietf:params:oauth:token-type:id_token and the actor token provided in the token exchange request is a valid Auth0 generated ID token. */
    actor_token_user?: {
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
      /** An array of authentication factors that the user has enrolled. */
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
    /** [Early Access] An object containing shared data across custom Actions for the duration of a transaction. */
    metadata?: {
      [additionalProperties: string]: string | number | boolean;
    };
    /** The scopes requested (if any) provided in the token exchange request. */
    requested_scopes: string[];
    /** The type of token to be generated by Auth0. For example: urn:ietf:params:oauth:token-type:access_token. */
    requested_token_type: string | null;
    /** The subject token provided in the token exchange request. */
    subject_token: string;
    /** The subject_token_type provided in the token exchange request. */
    subject_token_type: string;
  };
};
/** EventStreamV1Event */
type EventStreamV1Event = {
  /** The CloudEvent message containing all event properties. */
  message: {
    /** Identifies the event. */
    id: string;
    /** Describes the type of event related to the originating occurrence. */
    type: string;
    /** The event payload. */
    data?: {
      [additionalProperties: string]: any;
    } | null;
    /** Identifies the context in which an event happened. */
    source: string;
    /** The version of the CloudEvents specification which the event uses. */
    specversion: string;
    /** Timestamp of when the occurrence happened. Must adhere to RFC 3339. */
    time?: string | null;
    /** The Auth0 tenant identifier to which the event is associated. */
    a0tenant: string;
    /**
     * The Auth0 event stream ID of the stream the event was delivered on.
     * Present when the event is delivered via an event stream; omitted when
     * events are retrieved via the Events API (GET /api/v2/events).
     */
    a0stream?: string;
    /** The purpose of this event. Set only in special cases such as a test event; omitted for normal events. */
    a0purpose?: 'test' & string;
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
/** PostChangePasswordV2Event */
type PostChangePasswordV2Event = {
  /** Details about supplemental authentication signals obtained during the password change flow. */
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
/** PostLoginV3Event */
type PostLoginV3Event = {
  /** [Early Access] Information about the agent acting in this flow. Set when the authenticating client is linked to an agent and the tenant has agents as principals enabled; `undefined` otherwise. */
  agent?: {
    /** [Early Access] The stable identifier for the agent, prefixed with `agt_` (for example, `agt_2hVk6JxPxbRgNZDKfJQqmn`). */
    agent_id: string;
    /** [Early Access] Free-form key-value metadata associated with the agent. Always defined when `agent` is present; an empty object when the agent has no metadata. */
    agent_metadata: {
      [additionalProperties: string]: any;
    };
    /** [Early Access] The human-readable name of the agent. */
    name: string;
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
    /** Details about risk assessments obtained during the login or password reset flow. */
    riskAssessment?: {
      assessments: {
        /** Determines if the user is logging in as a known agent. */
        AgentDetection?: {
          code: 'unknown' | 'verified_agent';
          confidence: 'low' | 'medium' | 'high' | 'neutral';
          details?: {
            provider?: string;
          };
        };
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
      /** [Early Access] Supplemental risk assessment. */
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
    /** [Early Access] An object for holding refresh token configuration properties. */
    refresh_token?: {
      /** [Early Access] A collection of policies governing multi-resource refresh token exchange (MRRT), defining how refresh tokens can be used across different resource servers */
      policies?: {
        /** [Early Access] The specific resource server (audience) to which this MRRT policy applies. */
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
    /** Refresh Token Metadata */
    metadata?: {
      [additionalProperties: string]: any;
    };
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
    /** The actor for sessions established using Session transfer tokens from Custom Token Exchange. Contains a required 'sub' property and up to 5 additional properties set via the Custom Token Exchange action. The actor will be defined for delegated sessions only. */
    actor?: {
      /** The subject identifier of the actor. A unique identifier for the entity acting in this role. */
      sub: string;
    } & {
      [additionalProperties: string]: string | number | boolean | null;
    };
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
    /** [Enterprise Customers] [Early Access] Session Metadata */
    metadata?: {
      [additionalProperties: string]: any;
    };
    /** [Enterprise Customers] [Early Access] This object is defined when the session is created from a session transfer token (Native to Web SSO), undefined otherwise. */
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
  /** [Early Access] Details of the current session transfer token being used to establish Single Sign-On (SSO) from a native application to a web application. */
  session_transfer_token?: {
    /** [Early Access] The client identifier of the application that issued the token. */
    client_id: string;
    /** [Early Access] Details about the request that issued the token. */
    request: {
      /** [Early Access] The Autonomous System Number (ASN) associated with the request that issued the token. */
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
      /** [Early Access] The IP address associated with the request that issued the token. */
      ip: string;
      /** [Early Access] The User-Agent string of the device that issued the token. */
      user_agent?: string;
    };
    /** [Early Access] The scopes requested when the token was issued. */
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
    /** The actor in a token exchange request. */
    actor?: {
      /** The next actor in the delegation chain, representing that this actor is making the request on behalf of another principal. */
      act?: {
        /** The next actor in the delegation chain, representing that this actor is making the request on behalf of another principal. */
        act?: {
          /** The next actor in the delegation chain, representing that this actor is making the request on behalf of another principal. */
          act?: {
            /** The next actor in the delegation chain, representing that this actor is making the request on behalf of another principal. */
            act?: {
              act?: never;
              /** The subject identifier of the actor. A unique identifier for the entity acting in this role. */
              sub: string;
            } & {
              [additionalProperties: string]: any;
            };
            /** The subject identifier of the actor. A unique identifier for the entity acting in this role. */
            sub: string;
          } & {
            [additionalProperties: string]: any;
          };
          /** The subject identifier of the actor. A unique identifier for the entity acting in this role. */
          sub: string;
        } & {
          [additionalProperties: string]: any;
        };
        /** The subject identifier of the actor. A unique identifier for the entity acting in this role. */
        sub: string;
      } & {
        [additionalProperties: string]: any;
      };
      /** The subject identifier of the actor. A unique identifier for the entity acting in this role. */
      sub: string;
    } & {
      [additionalProperties: string]: any;
    };
    /** The type of the actor token in a token exchange request. */
    actor_token_type?: string;
    /** Correlation ID can be provided in the initial authentication request when the application redirects to Universal Login. You can use value to correlate logs and requests from your Action code with the user flow. */
    correlation_id?: string;
    /** An object containing shared data across custom Actions for the duration of a transaction. */
    metadata: {
      [additionalProperties: string]: string | number | boolean;
    };
    /** The type of the subject token in a token exchange request. */
    subject_token_type?: string;
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
/** PostUserRegistrationV2Event */
type PostUserRegistrationV2Event = {
  /** Details about supplemental authentication signals obtained during the registration flow. */
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
  request?: {
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
  } & {
    [additionalProperties: string]: any;
  };
} & {
  [additionalProperties: string]: any;
};
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
/** Options to control the behavior of the setUserByConnection command. */
type CustomTokenExchangeSetUserByConnectionOptions = {
  /** Behavior to apply if no user with the specified user_id exists in the connection. */
  creationBehavior: 'create_if_not_exists' | 'none';
  /** Behavior to apply if a user with specified user_id already exists in the connection. */
  updateBehavior: 'replace' | 'none';
};
/** An object containing the user profile attributes to set. */
type CustomTokenExchangeSetUserByConnectionUserAttributes = {
  /** The user's email. */
  email?: string;
  /** Whether this email address is verified (true) or unverified (false). */
  email_verified?: boolean;
  /** The user's family name(s). */
  family_name?: string;
  /** The user's given name(s). */
  given_name?: string;
  /** The user's full name. */
  name?: string;
  /** The user's nickname. */
  nickname?: string;
  /** The user's phone number (following the E.164 recommendation). */
  phone_number?: string;
  /** Whether this phone number has been verified (true) or not (false). */
  phone_verified?: boolean;
  /** A URI pointing to the user's picture. */
  picture?: string;
  /** The user's unique identifier within the connection. */
  user_id: string;
  /** The user's username. */
  username?: string;
  /** Whether the user will receive a verification email after creation (true) or no email (false). */
  verify_email?: boolean;
} & {
  [additionalProperties: string]: any;
};
export type {
  CustomTokenExchangeV1Event as C,
  EventStreamV1Event as E,
  PasswordResetPostChallengeV1Event as P,
  SendPhoneMessageV2Event as S,
  CustomTokenExchangeSetUserByConnectionUserAttributes as a,
  CustomTokenExchangeSetUserByConnectionOptions as b,
  PostChangePasswordV2Event as c,
  PostLoginV3Event as d,
  PromptId as e,
  PromptOptions as f,
  PostUserRegistrationV2Event as g,
  PreUserRegistrationV2Event as h,
};
