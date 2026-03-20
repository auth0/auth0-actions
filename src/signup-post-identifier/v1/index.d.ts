/**
 * [Beta] Methods and utilities to help change the behaviour of the signup flow.
 */
interface SignupPostIdentifierAPI {}
interface Secrets {
  [secretName: string]: string;
}
interface Configuration {}
interface Event {
  /** Details about the signup flow. */
  authentication: {
    /** The identifiers entered by the user during the signup flow. */
    identifiers: {
      /** The email address entered by the user. */
      email?: string;
      /** The phone number entered by the user. */
      phone_number?: string;
      /** The username entered by the user. */
      username?: string;
    };
  };
  /** Details the Client with which this signup transaction was initiated. */
  client: {
    /** The client id of the application to which the user is signing up. */
    client_id: string;
    /** An object for holding other application properties. */
    metadata: {
      [key: string]: string;
    };
    /** The name of the application (as defined in the Dashboard). */
    name: string;
  };
  /**
   * @private Configuration values associated with this Action.
   */
  readonly configuration: Configuration;
  /**
   * Details about the connection resolved prior to SignupPostIdentifier trigger's execution.
   *
   * This value is determined by Auth0's Home Realm Discovery (HRD) logic, the user's identifier, or a `connection` parameter from the initial authentication request. It represents the state *before* the SignupPostIdentifier trigger runs.
   *
   * **Important**: Calling `api.authentication.setConnectionByName()` **will not** change the value of this property. It only influences which connection will be used *after* the SignupPostIdentifier trigger completes.
   */
  initial_connection: {
    /** The connection's unique identifier. */
    id: string;
    /** Metadata associated with the connection. */
    metadata?: {
      [key: string]: string;
    };
    /** The name of the connection used to authenticate the user (such as `twitter` or `some-g-suite-domain`). */
    name: string;
    /** The type of connection. For social connections, `event.connection.strategy === event.connection.name`. For enterprise connections, the strategy is `waad` (Windows Azure AD), `ad` (Active Directory/LDAP), `auth0` (database connections), and so on. */
    strategy: string;
  };
  /**
   * Contains information about the organization resolved prior to SignupPostIdentifier trigger's execution.
   *
   * This value is determined by the user's identifier or an `organization` parameter from the initial authentication request. It represents the state *before* the SignupPostIdentifier trigger runs.
   *
   * **Important**: Calling `api.authentication.setOrganization()` **will not** change the value of this property. It only influences which organization will be used *after* the SignupPostIdentifier trigger completes.
   */
  initial_organization?: {
    /** The Organization identifier. */
    id: string;
    /** The friendly name of the Organization. */
    display_name: string;
    /** Metadata associated with the Organization. */
    metadata: {
      [key: string]: string;
    };
    /** The name of the Organization. */
    name: string;
  };
  /** Details about the request that caused this trigger to execute. */
  request: {
    /** The ASN (autonomous system number) of the user-agent making the request. */
    asn?: string;
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
      [key: string]: any;
    };
    /** The value of the `User-Agent` header received when initiating the transaction. */
    user_agent?: string;
  };
  /** Details about the resource server to which the access is being requested. */
  resource_server?: {
    /** The identifier of the resource server. For example: `https://your-api.example.com`. */
    identifier: string;
  };
  /**
   * Secret values securely associated with this Action.
   */
  readonly secrets: Secrets;
  /** An object containing fingerprint signatures. This will be available only if the client is using CloudFlare. The JA3/JA4 fingerprint can be null or empty in some cases. The most common case is for HTTP requests because JA3 and JA4 are calculated in TLS. It can also be empty due to the Worker sending requests within the same zone or to a zone that is not proxied (or a third party). */
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
  transaction: {
    /** Any acr_values provided in the original authentication request. */
    acr_values: string[];
    /** Correlation ID can be provided in the initial authentication request when the application redirects to Universal Login. You can use value to correlate logs and requests from your Action code with the user flow. */
    correlation_id?: string;
    /** The locale to be used for this transaction as determined by comparing the browser's requested languages to the tenant's language settings. */
    locale: string;
    /** Hint to the Authorization Server about the login identifier the End-User might use to log in (if necessary). */
    login_hint?: string;
    /** List of instructions indicating whether the user may be prompted for re-authentication and consent. */
    prompt?: string[];
    protocol?:
      | 'oidc-basic-profile'
      | 'oidc-implicit-profile'
      | 'oidc-hybrid-profile'
      | 'samlp'
      | 'wsfed';
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
  };
}
interface SignupPostIdentifierAction {
  (event: Event, api: SignupPostIdentifierAPI): Promise<void>;
}
export type { Configuration, Event, Secrets, SignupPostIdentifierAPI, SignupPostIdentifierAction };
