interface Event {
  actor: {
    /** The body of the POST request. */
    body?: {
      [key: string]: any;
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
      [key: string]: any;
    };
    /** The hostname that is being used for the authentication flow. */
    hostname?: string;
    /** The originating IP address of request. */
    ip: string;
    /** The language requested by the browser. */
    language?: string;
    /** The HTTP method used for the request */
    method?: string;
    userAgent?: string;
  };
  audience: string;
  client: {
    /** The client id of the application the user is logging in to. */
    id: string;
    /** An object for holding other application properties. */
    metadata: {
      [key: string]: string;
    };
    /** The name of the application (as defined in the Dashboard). */
    name: string;
  };
  command?: {
    type: 'deny';
    message: string;
    reason: 'invalid_scope' | 'invalid_request' | 'server_error';
  };
  customClaims: {
    [key: string]: any;
  };
  scope: string[];
  tenant: {
    /** The name of the tenant. */
    id: string;
  };
  [key: string]: any;
}
interface Result {
  command?: {
    type: 'deny';
    message: string;
    reason: 'invalid_scope' | 'invalid_request' | 'server_error';
  };
  customClaims?: {
    [key: string]: any;
  };
  scope?: string[];
}
interface Secrets {
  [secretName: string]: string;
}
interface Context {
  secrets: Secrets;
}
interface CredentialsExchangeAction {
  (event: Event, context: Context): Promise<Result | undefined>;
}
export type { Context, CredentialsExchangeAction, Event, Result, Secrets };
