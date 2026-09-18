import { M as ModuleRegistration, L as LoadedAction } from '../../../_shared/DMXD7FWp.js';
import { CustomEmailProviderModule } from '../index';
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
