import { M as ModuleRegistration, L as LoadedAction } from '../../../_shared/DMXD7FWp.js';
import { PostUserRegistrationModule } from '../index';
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
