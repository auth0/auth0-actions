import {
  C as CacheAPI,
  M as ModuleRegistration,
  L as LoadedAction,
} from '../../../_shared/BquXyhu2.js';
import { S as SendPhoneMessageV2Event } from '../../../_shared/CUlF8oaW.js';
/**
 * Methods and utilities to help change the behavior of sending a phone message.
 */
interface SendPhoneMessageAPI {
  /**
   * Store and retrieve data that persists across executions.
   */
  readonly cache: CacheAPI;
}
interface Configuration {}
interface Secrets {
  [secretName: string]: string;
}
interface Event extends SendPhoneMessageV2Event {
  /**
   * @private Configuration values associated with this Action.
   */
  configuration: Configuration;
  /**
   * Secret values securely associated with this Action.
   */
  secrets: Secrets;
}
interface SendPhoneMessageAction {
  (event: Event, api: SendPhoneMessageAPI): Promise<void>;
}
type SendPhoneMessageModule = {
  onExecuteSendPhoneMessage: SendPhoneMessageAction;
};
/**
 * Builds `contextToArguments` input for tests: a fresh clone of the example event paired with a stubbed
 * {@link SendPhoneMessageTriggerAPI}. The event is cloned per call so mutations in one execution don't leak into the next.
 */
declare function getDefaultArguments(): Parameters<
  SendPhoneMessageModule[keyof SendPhoneMessageModule]
>;
/** Loads a SendPhoneMessage v2 action file for use in tests, e.g. `action.execute('onExecuteSendPhoneMessage', event, api)`. */
declare const loadAction: (
  filename: string,
  modules?: readonly ModuleRegistration[]
) => Promise<LoadedAction<SendPhoneMessageModule>>;
export { getDefaultArguments, loadAction };
