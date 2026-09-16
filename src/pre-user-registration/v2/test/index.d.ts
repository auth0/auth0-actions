import {
  C as CacheAPI,
  M as ModuleRegistration,
  L as LoadedAction,
} from '../../../_shared/BquXyhu2.js';
import { h as PreUserRegistrationV2Event } from '../../../_shared/CUlF8oaW.js';
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
type PreUserRegistrationModule = {
  onExecutePreUserRegistration: PreUserRegistrationAction;
  onContinuePreUserRegistration: PreUserRegistrationAction;
};
/**
 * Builds `contextToArguments` input for tests: a fresh clone of the example event paired with a stubbed
 * {@link PreUserRegistrationTriggerAPI}. The event is cloned per call so mutations in one execution don't leak into the next.
 */
declare function getDefaultArguments(): Parameters<
  PreUserRegistrationModule[keyof PreUserRegistrationModule]
>;
/** Loads a PreUserRegistration v2 action file for use in tests, e.g. `action.execute('onExecutePreUserRegistration', event, api)`. */
declare const loadAction: (
  filename: string,
  modules?: readonly ModuleRegistration[]
) => Promise<LoadedAction<PreUserRegistrationModule>>;
export { getDefaultArguments, loadAction };
