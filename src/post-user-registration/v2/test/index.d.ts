import {
  C as CacheAPI,
  M as ModuleRegistration,
  L as LoadedAction,
} from '../../../_shared/BquXyhu2.js';
import { g as PostUserRegistrationV2Event } from '../../../_shared/CUlF8oaW.js';
/**
 * Methods and utilities to help change the behavior after a signup.
 */
interface PostUserRegistrationAPI {
  /**
   * Store and retrieve data that persists across executions.
   */
  readonly cache: CacheAPI;
}
interface Configuration {}
interface Secrets {
  [secretName: string]: string;
}
interface Event extends PostUserRegistrationV2Event {
  /**
   * @private Configuration values associated with this Action.
   */
  configuration: Configuration;
  /**
   * Secret values securely associated with this Action.
   */
  secrets: Secrets;
}
interface PostUserRegistrationAction {
  (event: Event, api: PostUserRegistrationAPI): Promise<void>;
}
type PostUserRegistrationModule = {
  onExecutePostUserRegistration: PostUserRegistrationAction;
};
/**
 * Builds `contextToArguments` input for tests: a fresh clone of the example event paired with a stubbed
 * {@link PostUserRegistrationTriggerAPI}. The event is cloned per call so mutations in one execution don't leak into the next.
 */
declare function getDefaultArguments(): Parameters<
  PostUserRegistrationModule[keyof PostUserRegistrationModule]
>;
/** Loads a PostUserRegistration v2 action file for use in tests, e.g. `action.execute('onExecutePostUserRegistration', event, api)`. */
declare const loadAction: (
  filename: string,
  modules?: readonly ModuleRegistration[]
) => Promise<LoadedAction<PostUserRegistrationModule>>;
export { getDefaultArguments, loadAction };
