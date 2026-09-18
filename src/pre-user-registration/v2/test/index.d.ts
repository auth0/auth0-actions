import { M as ModuleRegistration, L as LoadedAction } from '../../../_shared/DMXD7FWp.js';
import { PreUserRegistrationModule } from '../index';
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
