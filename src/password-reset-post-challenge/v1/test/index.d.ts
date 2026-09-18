import { M as ModuleRegistration, L as LoadedAction } from '../../../_shared/DMXD7FWp.js';
import { PasswordResetPostChallengeModule } from '../index';
/**
 * Builds `contextToArguments` input for tests: a fresh clone of the example event paired with a stubbed
 * {@link PasswordResetPostChallengeTriggerAPI} and redirect context. The event is cloned per call so
 * mutations in one execution don't leak into the next.
 */
declare function getDefaultArguments(): Parameters<
  PasswordResetPostChallengeModule[keyof PasswordResetPostChallengeModule]
>;
/** Loads a PasswordResetPostChallenge v1 action file for use in tests, e.g. `action.execute('onExecutePostChallenge', event, api)`. */
declare const loadAction: (
  filename: string,
  modules?: readonly ModuleRegistration[]
) => Promise<LoadedAction<PasswordResetPostChallengeModule>>;
export { getDefaultArguments, loadAction };
