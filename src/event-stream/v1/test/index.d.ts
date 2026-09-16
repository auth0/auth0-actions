import {
  C as CacheAPI,
  M as ModuleRegistration,
  L as LoadedAction,
} from '../../../_shared/BquXyhu2.js';
import { E as EventStreamV1Event } from '../../../_shared/CUlF8oaW.js';
/**
 * Methods and utilities to help change the behaviour of the event stream flow.
 */
interface EventStreamAPI {
  /**
   * Store and retrieve data that persists across executions.
   */
  readonly cache: CacheAPI;
}
interface Configuration {}
interface Secrets {
  [secretName: string]: string;
}
interface Event extends EventStreamV1Event {
  /**
   * @private Configuration values associated with this Action.
   */
  configuration: Configuration;
  /**
   * Secret values securely associated with this Action.
   */
  secrets: Secrets;
}
interface EventStreamAction {
  (event: Event, api: EventStreamAPI): Promise<void>;
}
type EventStreamModule = {
  onExecuteEventStream: EventStreamAction;
};
/**
 * Builds `contextToArguments` input for tests: a fresh clone of the example event paired with a stubbed
 * {@link EventStreamTriggerAPI}. The event is cloned per call so mutations in one execution don't leak into the next.
 */
declare function getDefaultArguments(): Parameters<EventStreamModule[keyof EventStreamModule]>;
/** Loads an EventStream v1 action file for use in tests, e.g. `action.execute('onExecuteEventStream', event, api)`. */
declare const loadAction: (
  filename: string,
  modules?: readonly ModuleRegistration[]
) => Promise<LoadedAction<EventStreamModule>>;
export { getDefaultArguments, loadAction };
