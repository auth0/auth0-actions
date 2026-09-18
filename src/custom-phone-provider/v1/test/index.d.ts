import { M as ModuleRegistration, L as LoadedAction } from '../../../_shared/DMXD7FWp.js';
import { CustomPhoneProviderModule } from '../index';
/**
 * Builds `contextToArguments` input for tests: a fresh clone of the example event paired with a stubbed
 * {@link CustomPhoneProviderTriggerAPI}. The event is cloned per call so mutations in one execution don't leak into the next.
 */
declare function getDefaultArguments(): Parameters<
  CustomPhoneProviderModule[keyof CustomPhoneProviderModule]
>;
/** Loads a CustomPhoneProvider v1 action file for use in tests, e.g. `action.execute('onExecuteCustomPhoneProvider', event, api)`. */
declare const loadAction: (
  filename: string,
  modules?: readonly ModuleRegistration[]
) => Promise<LoadedAction<CustomPhoneProviderModule>>;
export { getDefaultArguments, loadAction };
