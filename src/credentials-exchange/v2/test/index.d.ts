import {
  C as CacheAPI,
  M as ModuleRegistration,
  L as LoadedAction,
} from '../../../_shared/BquXyhu2.js';
import { A as AccessDeniedErrorCode } from '../../../_shared/C_R4QU65.js';
import '../../../_shared/CUlF8oaW.js';
interface Configuration {}
interface Secrets {
  [secretName: string]: string;
}
interface Event {
  /** Information about the access token to be issued. */
  accessToken: {
    customClaims: {
      [key: string]: any;
    };
    scope: string[];
  };
  /** [Early Access] Information about the agent acting in this flow. Set when the client requesting the token is linked to an agent and the tenant has agents as principals enabled; `undefined` otherwise. */
  agent?: {
    /** [Early Access] The stable identifier for the agent, prefixed with `agt_` (for example, `agt_2hVk6JxPxbRgNZDKfJQqmn`). */
    agent_id: string;
    /** [Early Access] Free-form key-value metadata associated with the agent. Always defined when `agent` is present; an empty object when the agent has no metadata. */
    agent_metadata: {
      [key: string]: any;
    };
    /** [Early Access] The human-readable name of the agent. */
    name: string;
  };
  /** Information about the Client used during this token exchange. */
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
  /** Details about the custom domain associated with the current transaction. */
  custom_domain?: {
    /** The custom domain name. */
    domain: string;
    /** Custom domain metadata as key-value pairs. */
    domain_metadata: {
      [key: string]: string;
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
      [key: string]: string;
    };
    /** The name of the Organization. */
    name: string;
    [key: string]: any;
  };
  /** Details about the request that initiated the transaction. */
  request: {
    /** The body of the POST request. This data will only be available during refresh token, Client Credential Exchange flows and PreUserRegistration Action. */
    body: {
      [key: string]: any;
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
      [key: string]: any;
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
  /** Information about the Resource Server that is issuing the access token. */
  resource_server: {
    /** The identifier of the resource server. For example: `https://your-api.example.com`. */
    identifier: string;
  };
  /** Information about the Tenant used during this token exchange. */
  tenant: {
    /** The name of the tenant. */
    id: string;
  };
  /** Information about the Credentials Exchange transaction. */
  transaction: {
    /** Correlation ID can be provided in the initial authentication request when the application redirects to Universal Login. You can use value to correlate logs and requests from your Action code with the user flow. */
    correlation_id?: string;
    /** The scopes specified (if any) when requesting the access token. */
    requested_scopes: string[];
    /** [Early Access] The live target scope set for the access token. Initialized from the client grants and immediately updated by api.transaction target scope methods across current and subsequent Actions. After all Actions complete, these scopes are intersected with the client grant. Scopes not present in the grant are silently dropped from the final access token. */
    target_scopes?: string[];
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
interface TransactionAPI {
  /**
   * [Early Access] Add a scope to the target scope set. Added scopes are intersected with the
   * client grant after all Actions complete. Scopes not present in the grant
   * are silently dropped from the final access token.
   *
   * @param scope The scope to add.
   * @throws Will throw an error if the scope is invalid.
   *
   * @example
   * ```js
   * exports.onExecuteCredentialsExchange = async (event, api) => {
   *   api.transaction.addTargetScope('read:reports');
   * };
   * ```
   */
  addTargetScope(scope: string): void;
  /**
   * [Early Access] Remove a scope from the target scope set.
   *
   * @param scope The scope to remove.
   * @throws Will throw an error if the scope is invalid.
   *
   * @example
   * ```js
   * exports.onExecuteCredentialsExchange = async (event, api) => {
   *   api.transaction.removeTargetScope('admin:full');
   * };
   * ```
   */
  removeTargetScope(scope: string): void;
  /**
   * [Early Access] Replace the entire target scope set. The new scopes are intersected with
   * the client grant after all Actions complete. Scopes not present in the
   * grant are silently dropped from the final access token.
   *
   * @param scopes The new target scope set.
   * @throws Will throw an error if any scope is invalid.
   *
   * @example
   * ```js
   * exports.onExecuteCredentialsExchange = async (event, api) => {
   *   api.transaction.setTargetScopes(['read:users', 'write:users']);
   * };
   * ```
   */
  setTargetScopes(scopes: string[]): void;
  /**
   * [Early Access] Remove all scopes from the target scope set.
   *
   * @example
   * ```js
   * exports.onExecuteCredentialsExchange = async (event, api) => {
   *   api.transaction.clearTargetScopes();
   * };
   * ```
   */
  clearTargetScopes(): void;
}
interface AccessAPI {
  /**
   * Mark the current token exchange as denied.
   *
   * @param code The protocol-specific error code justifying the rejection of the login.
   * @param reason A human-readable explanation for rejecting the access token grant.
   */
  deny(code: AccessDeniedErrorCode, reason?: string): CredentialsExchangeAPI;
}
interface AccessTokenAPI {
  /**
   * Set a custom claim on the Access Token that will be issued.
   *
   * @param key Name of the claim (note that this may need to be a fully-qualified url).
   * @param value The value of the claim.
   */
  setCustomClaim(key: string, value: unknown): CredentialsExchangeAPI;
}
/**
 * Methods and utilities to help change the behavior of the Client Credentials Exchange grant.
 */
interface CredentialsExchangeAPI {
  /**
   * Control availability to the access token.
   */
  readonly access: AccessAPI;
  /**
   * Request changes to the access token being issued.
   */
  readonly accessToken: AccessTokenAPI;
  /**
   * Make changes to the cache.
   */
  readonly cache: CacheAPI;
  /**
   * [Early Access] Make changes to the transaction.
   */
  readonly transaction: TransactionAPI;
}
interface CredentialsExchangeAction {
  (event: Event, api: CredentialsExchangeAPI): Promise<void>;
}
type CredentialsExchangeModule = {
  onExecuteCredentialsExchange: CredentialsExchangeAction;
};
/**
 * Builds `contextToArguments` input for tests: a fresh clone of the example event paired with a stubbed
 * {@link CredentialsExchangeTriggerAPI}. The event is cloned per call so mutations in one execution don't leak into the next.
 */
declare function getDefaultArguments(): Parameters<
  CredentialsExchangeModule[keyof CredentialsExchangeModule]
>;
/** Loads a CredentialsExchange v2 action file for use in tests, e.g. `action.execute('onExecuteCredentialsExchange', event, api)`. */
declare const loadAction: (
  filename: string,
  modules?: readonly ModuleRegistration[]
) => Promise<LoadedAction<CredentialsExchangeModule>>;
export { getDefaultArguments, loadAction };
