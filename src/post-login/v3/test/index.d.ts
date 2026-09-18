import { M as ModuleRegistration, L as LoadedAction } from '../../../_shared/DMXD7FWp.js';
import { PostLoginModule } from '../index';
/**
 * Builds `contextToArguments` input for tests: a fresh clone of the example event paired with a stubbed
 * {@link PostLoginTriggerAPI} and rules context. The event is cloned per call so mutations in one
 * execution don't leak into the next.
 */
declare function getDefaultArguments(): Parameters<PostLoginModule[keyof PostLoginModule]>;
/** Loads a PostLogin v3 action file for use in tests, e.g. `action.execute('onExecutePostLogin', event, api)`. */
declare const loadAction: (
  filename: string,
  modules?: readonly ModuleRegistration[]
) => Promise<LoadedAction<PostLoginModule>>;
export { getDefaultArguments, loadAction };
