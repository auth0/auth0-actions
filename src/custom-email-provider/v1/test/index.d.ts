import {
  C as CacheAPI,
  M as ModuleRegistration,
  L as LoadedAction,
} from '../../../_shared/BquXyhu2.js';
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
interface CustomEmailProviderAPI {
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
interface Configuration {}
interface Secrets {
  [secretName: string]: string;
}
interface Event {
  /** Information about the Client with which this login transaction was initiated. */
  client: {
    /** The client id of the application the user is logging in to. */
    client_id: string;
    /** An object for holding other application properties. */
    metadata: {
      [key: string]: string;
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
      [key: string]: string;
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
      [key: string]: string;
    };
  };
  notification: {
    /** Email address of the sender for the email. */
    from: string;
    /** Rendered HTML template. */
    html: string;
    /** The locale we rendered the message in, example `en_US`, as defined in the BCP-47 specification. */
    locale: string;
    /** The type of message that is being send, like `verify_email` or `welcome_email`. */
    message_type:
      | 'verify_email'
      | 'verify_email_by_code'
      | 'reset_email'
      | 'reset_email_by_code'
      | 'welcome_email'
      | 'verification_code'
      | 'mfa_oob_code'
      | 'enrollment_email'
      | 'blocked_account'
      | 'stolen_credentials'
      | 'try_provider_configuration_email'
      | 'organization_invitation';
    /** Subject to be attached to the email. */
    subject: string;
    /** Rendered text template. */
    text: string;
    /** Email address of the recipient. */
    to: string;
  };
  /** Details about the Organization associated with the current transaction. */
  organization?: {
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
  } & {
    [key: string]: any;
  };
  request: {
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
      [key: string]: any;
    };
    /** The hostname that is being used for the authentication flow. */
    hostname?: string;
    /** The originating IP address of the request. */
    ip?: string;
    /** The query string parameters sent to the authorization request. */
    query?: {
      [key: string]: string;
    };
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
      [key: string]: any;
    };
    /** (unique) User's email address. */
    email?: string;
    /** Indicates whether the user has verified their email address. */
    email_verified: boolean;
    /** User's family name. */
    family_name?: string;
    /** User's given name. */
    given_name?: string;
    /** User's full name. */
    name?: string;
    /** User's nickname. */
    nickname?: string;
    /** URL pointing to the [user's profile picture](https://auth0.com/docs/users/change-user-picture). */
    picture?: string;
    /** (unique) User's unique identifier. */
    user_id: string;
    /** Custom fields that store info about a user that does not impact what they can or cannot access, such as work address, home address, or user preferences. */
    user_metadata: {
      [key: string]: any;
    };
    /** (unique) User's username. */
    username?: string;
  } & {
    [key: string]: any;
  };
  /**
   * @private Configuration values associated with this Action.
   */
  configuration: Configuration;
  /**
   * Secret values securely associated with this Action.
   */
  secrets: Secrets;
}
interface CustomEmailProviderAction {
  (event: Event, api: CustomEmailProviderAPI): Promise<void>;
}
type CustomEmailProviderModule = {
  onExecuteCustomEmailProvider: CustomEmailProviderAction;
};
/**
 * Builds `contextToArguments` input for tests: a fresh clone of the example event paired with a stubbed
 * {@link CustomEmailProviderTriggerAPI}. The event is cloned per call so mutations in one execution don't leak into the next.
 */
declare function getDefaultArguments(): Parameters<
  CustomEmailProviderModule[keyof CustomEmailProviderModule]
>;
/** Loads a CustomEmailProvider v1 action file for use in tests, e.g. `action.execute('onExecuteCustomEmailProvider', event, api)`. */
declare const loadAction: (
  filename: string,
  modules?: readonly ModuleRegistration[]
) => Promise<LoadedAction<CustomEmailProviderModule>>;
export { getDefaultArguments, loadAction };
