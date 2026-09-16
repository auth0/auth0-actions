import {
  C as CacheAPI,
  M as ModuleRegistration,
  L as LoadedAction,
} from '../../../_shared/BquXyhu2.js';
import {
  C as CustomTokenExchangeV1Event,
  a as CustomTokenExchangeSetUserByConnectionUserAttributes,
  b as CustomTokenExchangeSetUserByConnectionOptions,
} from '../../../_shared/CUlF8oaW.js';
import { T as TxMetadataValue } from '../../../_shared/jH7s8Jy4.js';
/** Recursively defines nested actor levels, terminating when the depth tuple is exhausted. */
type NestedActor<D extends unknown[] = [1, 2, 3, 4]> = D extends [unknown, ...infer Rest]
  ? {
      sub: string;
      act?: NestedActor<Rest>;
    } & Record<string, any>
  : never;
/** Nested actor representing a delegation chain. Max 5 levels (root + 4 nested). */
type ActorParams = {
  sub: string;
  act?: NestedActor;
} & Record<string, any>;
interface Configuration {}
interface Secrets {
  [secretName: string]: string;
}
interface Event extends CustomTokenExchangeV1Event {
  /**
   * @private Configuration values associated with this Action.
   */
  configuration: Configuration;
  /**
   * Secret values securely associated with this Action.
   */
  secrets: Secrets;
}
interface AccessAPI {
  /**
   * Mark the current token exchange as denied.
   *
   * If the request is being denied due to an invalid subject token, we recommend that api.access.rejectInvalidSubjectToken be used instead,
   * to distinguish between brute force attempts on the subject token, and other reasons to deny the request.
   *
   * @param code The error code justifying the rejection of the token exchange. Can be invalid_request, server_error, or any custom code
   * @param reason A human-readable explanation for rejecting the token exchange request.
   *
   * @example
   * ```js
   * exports.onExecuteCustomTokenExchange = async (event, api) => {
   *
   *   // 1. Validate subject_token
   *   const subject_token = await validateToken(event.transaction.subject_token, jwksUri);
   *
   *   // 2. Apply your authorization policy on the user
   *   const isAuthorized = await authorizeAccess(subject_token.sub);
   *   if (!isAuthorized) {
   *     api.access.deny('Unauthorized_login', 'User cannot login due to reason: X');
   *   }
   *
   *   // if user is authorized, go on as indicated here
   *
   * };
   * ```
   */
  deny(code: string, reason: string): void;
  /**
   * Mark the provided subject token from the request as invalid. This will cause the request to be
   * rejected with an "invalid_request" error code.
   *
   * This will signal to the Attack Protection features that an invalid subject token has been provided,
   * so that protections to prevent brute force attacks on the subject token can be applied.
   *
   * @param reason A human-readable explanation for rejecting the token exchange request.
   *
   * @example
   * ```js
   * exports.onExecuteCustomTokenExchange = async (event, api) => {
   *
   *   try {
   *     // Validate subject_token
   *     const subject_token = await validateToken(event.transaction.subject_token, jwksUri);
   *     // set the user for the transaction
   *     api.authentication.setUserById(subject_token.id);
   *
   *   } catch (error) {
   *     if (error.message === 'Invalid Token') {
   *       // If specifically the problem is the subject_token is invalid
   *       console.error('Invalid Token error');
   *       api.access.rejectInvalidSubjectToken('Invalid subject_token');
   *     } else {
   *       // if there is any other unexpected error, throw a server error
   *       throw error;
   *     }
   *   }
   *
   * };
   * ```
   */
  rejectInvalidSubjectToken(reason: string): void;
}
interface AuthenticationAPI {
  /**
   * Indicate the user corresponding to the subject_token, by providing the userId. The token exchange request will issue tokens for this user.
   * This must be an existing user.
   * Note: Exactly one of api.authentication.setUserByConnection api.authentication.setUserById must be called by the Custom Token Exchange action.
   *
   * @param user_id The ID of the user; must be an existing user.
   *
   * @example
   * ```js
   * exports.onExecuteCustomTokenExchange = async (event, api) => {
   *
   *   // 1. Validate subject_token
   *   const subject_token = await validateToken(event.transaction.subject_token, jwksUri);
   *
   *   // 2. Apply your authorization policy on the user
   *   const isAuthorized = await authorizeAccess(subject_token.sub);
   *   if (!isAuthorized) {
   *     api.access.deny('Unauthorized_login', 'User cannot login due to reason: X');
   *   }
   *
   *   // 3. Set the user for the transaction
   *   api.authentication.setUserById(subject_token.sub);
   *
   *   return;
   * };
   * ```
   */
  setUserById(user_id: string): void;
  /**
   * Indicate the user corresponding to the subject_token, by providing a connection and user attributes.
   * The token exchange request will issue tokens for this user.
   *
   * This can be either an existing user, or a new user. If the user does not exist, it will be created.
   * The user_id property of the user_profile will be used to determine if the user already exists.
   *
   * Note: Exactly one of api.authentication.setUserByConnection api.authentication.setUserById must be called by the Custom Token Exchange action.
   *
   * @param connection_name Name of the connection the user should be stored in.
   *
   * @param user_attributes
   * The user's profile attributes, including user_id, and optionally other attributes such as email, name, etc.
   *
   * The user_id field is required, and should be the unique identifier of the user within the connection;
   * this will be used to determine if the user exists or should be created. In existing users, this user_id
   * can be found by inspecting the identities array of the normalized user profile.
   *
   * If the user already exists, the following user attributes cannot be updated: email, email_verified, phone, phone_verified, username.
   * If these do not match the existing user, an error will be returned.
   *
   *  @param options
   *  Options to control the behavior of the setUserByConnection command.
   *
   *    - `creationBehavior` - behavior to apply if no user with the specified user_id exists in the connection.
   *      Can be 'create_if_not_exists', which will cause a new user to be created using the supplied user attributes;
   *      or 'none', which will result in no user being created and an error being returned if no user exists.
   *
   *    - `updateBehavior` - Behavior to apply if a user with specified user_id already exists in the connection.
   *      Can be 'replace', which results in the existing user's attributes being replaced with the specified
   *      user attributes; or 'none' which means the existing user will not be modified.
   *
   * @example
   * Set user by connection with full profile attributes:
   * ```js
   * exports.onExecuteCustomTokenExchange = async (event, api) => {
   *
   *   // 1. Validate subject_token
   *   const subject_token = await validateToken(event.transaction.subject_token, jwksUri);
   *
   *   // 2. Apply your authorization policy on the user
   *   const isAuthorized = await authorizeAccess(subject_token.sub);
   *   if (!isAuthorized) {
   *     api.access.deny('Unauthorized_login', 'User cannot login due to reason: X');
   *   }
   *
   *   // 3. Set the user for the transaction
   *   api.authentication.setUserByConnection(
   *     'My Connection',
   *     {
   *       user_id: subject_token.sub,
   *       email: subject_token.email,
   *       email_verified: subject_token.email_verified,
   *       phone_number: subject_token.phone_number,
   *       phone_verified: subject_token.phone_number_verified,
   *       username: subject_token.preferred_username,
   *       name: subject_token.name,
   *       given_name: subject_token.given_name,
   *       family_name: subject_token.family_name,
   *       nickname: subject_token.nickname,
   *       verify_email: false
   *     },
   *     {
   *       creationBehavior: 'create_if_not_exists',
   *       updateBehavior: 'none'
   *     }
   *   );
   *
   *   return;
   * };
   * ```
   *
   * @example
   * Create a user without verifying email:
   * ```js
   * exports.onExecuteCustomTokenExchange = async (event, api) => {
   *
   *   // Validate subject_token
   *   const subject_token = await validateToken(event.transaction.subject_token, jwksUri);
   *
   *   // Create a user but don't verify email
   *   api.authentication.setUserByConnection(
   *     'My Connection',
   *     {
   *       user_id: subject_token.sub,
   *       email: subject_token.email,
   *       email_verified: false,
   *       verify_email: false
   *     },
   *     {
   *       creationBehavior: 'create_if_not_exists',
   *       updateBehavior: 'none'
   *     }
   *   );
   *
   *   return;
   * };
   * ```
   */
  setUserByConnection(
    connection_name: string,
    user_attributes: CustomTokenExchangeSetUserByConnectionUserAttributes,
    options: CustomTokenExchangeSetUserByConnectionOptions
  ): void;
  /**
   * Set the organization for the user associated with the token exchange.
   *
   * @param organization_id_or_name The ID or name of the organization to set for the user.
   *
   * @example
   * ```js
   * exports.onExecuteCustomTokenExchange = async (event, api) => {
   *
   *   // 1. Validate subject_token
   *   const subject_token = await validateToken(event.transaction.subject_token, jwksUri);
   *
   *   // 2. Apply your authorization policy on the user
   *   const isAuthorized = await authorizeAccess(subject_token.sub);
   *   if (!isAuthorized) {
   *     api.access.deny('Unauthorized_login', 'User cannot login due to reason: X');
   *   }
   *
   *   // 3. Set the organization for the transaction
   *   api.authentication.setOrganization('org_xS525r979AS33MSf');
   *
   *   // 4. Set the user for the transaction. You may also use setUserByConnection()
   *   api.authentication.setUserById(subject_token.sub);
   *
   *   return;
   * };
   * ```
   */
  setOrganization(organization_id_or_name: string): void;
  /**
   * Set the actor for the token exchange to represent the entity acting on behalf of the subject.
   * Must be used alongside the setUserById or setUserByConnection commands. Calling setActor is optional.
   * Receiving an actor_token in the request does not automatically produce an act claim; the Action must explicitly call this method.
   * Refresh tokens are not issued when an actor is set for the transaction.
   *
   * @param actor A nested object representing a delegation chain. Up to 4 additional act levels are allowed
   * (5 actors total, including the root actor).  For each level, the `sub` field is required; up to 5 additional
   * custom properties (string, boolean, or number values) may be provided.
   *
   * @example
   * ```js
   * exports.onExecuteCustomTokenExchange = async (event, api) => {
   *
   *   // 1. Validate subject_token
   *   const subject_token = await validateToken(event.transaction.subject_token, jwksUri);
   *   const actor_token = await validateToken(event.transaction.actor_token, jwksUri);
   *
   *   // 2. Set the actor for the transaction
   *   api.authentication.setActor({ sub: actor_token.sub });
   *
   *   // 3. Set the user for the transaction
   *   api.authentication.setUserById(subject_token.sub);
   *
   *   return;
   * };
   * ```
   */
  setActor(actor: ActorParams): void;
}
interface TransactionAPI {
  /**
   * [Early Access] Store or update the value in the transaction metadata for a specified key.
   *
   * Metadata modified using this method is updated in real-time in the
   * `event.transaction.metadata` object.
   *
   * @param key The key of the property to be set.
   * @param value The value of the property. This may be set to `null` to remove the
   * metadata property.
   *
   * @example
   * ```js
   * exports.onExecuteCustomTokenExchange = async (event, api) => {
   *   // Store data to share across Actions for the duration of the transaction.
   *   api.transaction.setMetadata('subject_verified', true);
   *   api.transaction.setMetadata('risk_score', 42);
   *
   *   // Read it back from the event in real-time.
   *   console.log(event.transaction.metadata.risk_score); // 42
   *
   *   // Remove a previously set property by passing `null`.
   *   api.transaction.setMetadata('risk_score', null);
   * };
   * ```
   */
  setMetadata(key: string, value: TxMetadataValue | null): void;
}
interface UserAPI {
  /**
   * Set application-specific metadata for the user corresponding to the subject token.
   *
   * @param key The metadata property to be set.
   * @param value The value of the metadata property. This may be set to `null` to remove the
   * metadata property.
   *
   * @example
   * ```js
   * exports.onExecuteCustomTokenExchange = async (event, api) => {
   *   // Validate subject_token
   *   const subject_token = await validateToken(event.transaction.subject_token, jwksUri);
   *
   *   // set the user for the transaction
   *   api.authentication.setUserById(subject_token.id);
   *
   *   // set user group based on info contained in subject_token
   *   api.user.setAppMetadata('group', subject_token.group);
   *
   *   return;
   * };
   * ```
   */
  setAppMetadata(key: string, value: unknown): void;
  /**
   * Set general metadata for the user corresponding to the subject token.
   *
   * @param key The metadata property to be set.
   * @param value The value of the metadata property. This may be set to `null` to remove the
   * metadata property.
   *
   * @example
   * ```js
   * exports.onExecuteCustomTokenExchange = async (event, api) => {
   *   // Validate subject_token
   *   const subject_token = await validateToken(event.transaction.subject_token, jwksUri);
   *
   *   // set the user for the transaction
   *   api.authentication.setUserById(subject_token.id);
   *
   *   // set user preferred_locale based on info contained in subject_token
   *   api.user.setUserMetadata('preferred_locale', subject_token.locale);
   *
   *   return;
   * };
   * ```
   */
  setUserMetadata(key: string, value: unknown): void;
}
/**
 * Methods and utilities to help change the behaviour of the custom token exchange flow.
 */
interface CustomTokenExchangeAPI {
  /**
   * Modify the access of the token exchange request, such as rejecting the request.
   */
  readonly access: AccessAPI;
  /**
   * Indicate the result of the authentication of the subject token, to specify the user whom tokens will be issued for.
   */
  readonly authentication: AuthenticationAPI;
  /**
   * Request changes to the user corresponding to the subject token.
   */
  readonly user: UserAPI;
  /**
   * Store and retrieve data that persists across executions.
   */
  readonly cache: CacheAPI;
  /**
   * [Early Access] Make changes to the transaction.
   */
  readonly transaction: TransactionAPI;
}
interface CustomTokenExchangeAction {
  (event: Event, api: CustomTokenExchangeAPI): Promise<void>;
}
type CustomTokenExchangeModule = {
  onExecuteCustomTokenExchange: CustomTokenExchangeAction;
};
/**
 * Builds `contextToArguments` input for tests: a fresh clone of the example event paired with a stubbed
 * {@link CustomTokenExchangeTriggerAPI}. The event is cloned per call so mutations in one execution don't leak into the next.
 */
declare function getDefaultArguments(): Parameters<
  CustomTokenExchangeModule[keyof CustomTokenExchangeModule]
>;
/** Loads a CustomTokenExchange v1 action file for use in tests, e.g. `action.execute('onExecuteCustomTokenExchange', event, api)`. */
declare const loadAction: (
  filename: string,
  modules?: readonly ModuleRegistration[]
) => Promise<LoadedAction<CustomTokenExchangeModule>>;
export { getDefaultArguments, loadAction };
