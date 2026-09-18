import { M as ModuleRegistration, L as LoadedAction } from '../../../_shared/DMXD7FWp.js';
import { SendPhoneMessageModule } from '../index';
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
