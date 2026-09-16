import {
  C as CacheAPI,
  M as ModuleRegistration,
  L as LoadedAction,
} from '../../../_shared/BquXyhu2.js';
import { R as RenderPromptId, a as RenderPromptOptions } from '../../../_shared/C_R4QU65.js';
import { P as PasswordResetPostChallengeV1Event } from '../../../_shared/CUlF8oaW.js';
type FactorSelector =
  | {
      type: 'otp' | 'email' | 'webauthn-platform' | 'webauthn-roaming' | 'recovery-code';
      options?: {
        [key: string]: unknown;
      };
    }
  | {
      type: 'phone';
      options?: {
        preferredMethod?: 'sms' | 'voice' | 'both';
      };
    }
  | {
      type: 'push' | 'push-notification';
      options?: {
        otpFallback?: boolean;
      };
    };
interface ChallengeWithOptions {
  additionalFactors?: FactorSelector[];
}
interface AccessAPI {
  /**
   * Mark the current password reset attempt as denied. This will prevent the end-user from completing
   * the password reset flow. This will *NOT* cancel other user-related side-effects
   * requested by this Action. The password reset flow will immediately stop following the
   * completion of this action and no further Actions will be executed.
   *
   * @param reason A human-readable explanation for rejecting the password reset. This may be presented
   * directly in end-user interfaces.
   */
  deny(reason: string): void;
}
interface AuthenticationAPI {
  /**
   * Request a challenge for multifactor authentication using the supplied factor and optional additional factors.
   *
   * When a multifactor challenge is requested, subsequent Actions will not be run until that challenge has been
   * fulfilled by the user. A user will have satisfied the challenge in any of the following situations:
   *
   * 1. They successfully complete the challenge for the default factor.
   * 2. They successfully complete the challenge for any of the optional factors described in `additionalFactors`.
   *
   * If any of the factors requested has already been challenged successfully in the current transaction, it will
   * be ignored.
   *
   * If a factor is requested is not enabled on the tenant, it will be ignored. If a factor is requested that the user
   * has not enrolled, it will be ignored. If none of the requested factors is enabled or enrolled, the authentication
   * transaction will fail (i.e. login will not complete).
   *
   * _**Note**: This method will result in a factor challenge screen being shown if the user has not already satisfied
   * the requirements of the challenge. If `additionalFactors` are supplied, the user will have the option to
   * select another factor if they choose to._
   *
   * @param factor An object describing the type of factor its options that should be used for the initial challenge.
   * @param options Additional options which can also specify `additionalFactors` as a property.
   */
  challengeWith(factor: FactorSelector, options?: ChallengeWithOptions): void;
  /**
   * Request a challenge for multifactor authentication using any of the supplied factors (showing a factor selection
   * screen first).
   *
   * When a multifactor challenge is requested, subsequent Actions will not be run until that challenge has been
   * fulfilled by the user. A user will have satisfied the challenge in any of the following situations:
   *
   * 1. They successfully complete the challenge for any of the factors.
   *
   * If any of the factors requested has already been challenged successfully in the current transaction, it will
   * be ignored.
   *
   * If a factor is requested is not enabled on the tenant, it will be ignored. If a factor is requested that the user
   * has not enrolled, it will be ignored. If none of the requested factors is enabled or enrolled, the authentication
   * transaction will fail (i.e. login will not complete).
   *
   * _**Note**: This method will result in the factor selector screen being shown if the user has not already satisfied
   * the requirements of the challenge. If there is a preferred factor, the `api.authentication.challengeWith()` method
   * is preferred. The factor selector screen will not be shown if only one factor is passed in or is valid._
   *
   * @param factors An array of factors.
   */
  challengeWithAny(factors: FactorSelector[]): void;
}
interface PromptAPI {
  /**
   * Renders a custom prompt.
   *
   * @param promptId The prompt ID.
   * @param promptOptions The render options.
   */
  render(promptId: RenderPromptId, promptOptions?: RenderPromptOptions): void;
}
interface TokenCreationOptions {
  /**
   * Number of seconds before this token will expire
   *
   * @default 900 15 minutes.
   */
  expiresInSeconds?: number;
  /**
   * The data intended to be passed to the target of the redirect and whose authenticity
   * and integrity must be provable.
   */
  payload: {
    [key: string]: unknown;
  };
  /**
   * A secret that will be used to sign a JWT that is shared with the redirect target. The
   * secret value should be stored as a **secret** and retrieved using
   * `event.secrets['<secret_name>']`.
   */
  secret: string;
}
interface ValidateSessionTokenOptions {
  secret: string;
  /**
   * The name of the query or body parameter that was sent to the /continue endpoint.
   *
   * @default 'session_token'
   */
  tokenParameterName?: string;
}
interface SendUserToOptions {
  /**
   * An object representing additional query string parameters that should be appended to
   * the redirect URL.
   */
  query?: {
    [param: string]: string;
  };
}
interface RedirectAPI {
  /**
   * Create a session token suitable for using as a query string parameter redirect target (via `sendUserTo`)
   * that contains data whose authenticity must be provable by the target endpoint. The target endpoint
   * can verify the authenticity and integrity of the data by checking the JWT's signature
   * using a shared secret.
   *
   * The shared secret should be stored as a **secret** of the Action and will be readable at
   * `event.secrets['<secret_name>']`.
   *
   * @param options Configure how sensitive data is encoded into the query parameters of the
   * resulting url.
   *
   * @returns A JWT string.
   */
  encodeToken(options: TokenCreationOptions): string;
  /**
   * Cause the password reset pipeline to trigger a browser redirect to the target `url` immediately after
   * this action completes. The `createUrl` helper method is provided to simplify encoding
   * data as a query parameter in the target `url` such that the data's authenticity and
   * integrity can be verified by the target endpoint.
   *
   * @param baseUrl The url to which to redirect the user.
   */
  sendUserTo(url: string, options?: SendUserToOptions): void;
  /**
   * Retrieve the data encoded in a JWT token passed to the `/continue` endpoint while verifying
   * the authenticity and integrity of that data.
   *
   * @param options Options for retrieving the data encoded in a JWT token passed to the
   * `/continue` endpoint following a rediret.
   *
   * @returns The payload of the JWT token.
   */
  validateToken(options: ValidateSessionTokenOptions): any;
}
interface ResultUrlOptions {
  /**
   * The query parameters to include in the URL.
   */
  query?: Record<string, string>;
}
interface TransactionAPI {
  /**
   * Set the URL that the user should be redirected to after the password reset.
   *
   * @param url The URL to redirect the user to.
   */
  setResultUrl(url: string, options?: ResultUrlOptions): void;
}
/**
 * Methods and utilities to help change the behavior of the password reset flow.
 */
interface PasswordResetPostChallengeAPI {
  /**
   * Modify the access of the user that is attempting to reset their password.
   */
  readonly access: AccessAPI;
  /**
   * Request changes to the authentication state of the current user's session.
   */
  readonly authentication: AuthenticationAPI;
  /**
   * Configure and initiate external redirects.
   */
  readonly redirect: RedirectAPI;
  /**
   * Make changes to the cache.
   */
  readonly cache: CacheAPI;
  /**
   * Renders a custom prompt.
   */
  readonly prompt: PromptAPI;
  /**
   * Configure the transaction.
   */
  readonly transaction: TransactionAPI;
}
interface Secrets {
  [secretName: string]: string;
}
interface Configuration {}
interface Event extends PasswordResetPostChallengeV1Event {
  /**
   * @private Configuration values associated with this Action.
   */
  readonly configuration: Configuration;
  /**
   * Secret values securely associated with this Action.
   */
  readonly secrets: Secrets;
}
interface PasswordResetPostChallengeAction {
  (event: Event, api: PasswordResetPostChallengeAPI): Promise<void>;
}
type PasswordResetPostChallengeModule = {
  onExecutePostChallenge: PasswordResetPostChallengeAction;
  onContinuePostChallenge: PasswordResetPostChallengeAction;
};
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
