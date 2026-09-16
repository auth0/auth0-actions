import {
  C as CacheAPI,
  M as ModuleRegistration,
  L as LoadedAction,
} from '../../../_shared/BquXyhu2.js';
import { c as PostChangePasswordV2Event } from '../../../_shared/CUlF8oaW.js';
/**
 * Methods and utilities to help change the behavior after a user changes their password.
 */
interface PostChangePasswordAPI {
  /**
   * Store and retrieve data that persists across executions.
   */
  readonly cache: CacheAPI;
}
interface Configuration {}
interface Secrets {
  [secretName: string]: string;
}
interface Event extends PostChangePasswordV2Event {
  /**
   * @private Configuration values associated with this Action.
   */
  configuration: Configuration;
  /**
   * Secret values securely associated with this Action.
   */
  secrets: Secrets;
}
interface PostChangePasswordAction {
  (event: Event, api: PostChangePasswordAPI): Promise<void>;
}
type PostChangePasswordModule = {
  onExecutePostChangePassword: PostChangePasswordAction;
};
/**
 * Builds `contextToArguments` input for tests: a fresh clone of the example event paired with a stubbed
 * {@link PostChangePasswordTriggerAPI}. The event is cloned per call so mutations in one execution don't leak into the next.
 */
declare function getDefaultArguments(): Parameters<
  PostChangePasswordModule[keyof PostChangePasswordModule]
>;
/** Loads a PostChangePassword v2 action file for use in tests, e.g. `action.execute('onExecutePostChangePassword', event, api)`. */
declare const loadAction: (
  filename: string,
  modules?: readonly ModuleRegistration[]
) => Promise<LoadedAction<PostChangePasswordModule>>;
export { getDefaultArguments, loadAction };
