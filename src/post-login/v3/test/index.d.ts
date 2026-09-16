import {
  C as CacheAPI,
  M as ModuleRegistration,
  L as LoadedAction,
} from '../../../_shared/BquXyhu2.js';
import { R as RenderPromptId, a as RenderPromptOptions } from '../../../_shared/C_R4QU65.js';
import { T as TxMetadataValue } from '../../../_shared/jH7s8Jy4.js';
import { d as PostLoginV3Event } from '../../../_shared/CUlF8oaW.js';
/** Pagination options for fetching the groups a user belongs to. */
type GetUserGroupsParams = {
  take?: number;
  from?: string;
};
type ListUserGroupsResponse = {
  /** The list of user groups. */
  groups: UserGroupMembership[];
  /** A cursor for pagination. */
  next?: string;
};
type UserGroupMembership = {
  /** Unique identifier of the group. */
  id: string;
  /** Name of the Group */
  name: string;
  /** External identifier of the group, often used for SCIM synchronization. */
  external_id?: string;
  /** Identifier of the connection this group belongs to (if a connection group). */
  connection_id?: string;
  /** Identifier of the tenant this group belongs to. */
  tenant_name: string;
  /** Timestamp of when the group was created. */
  created_at: string;
  /** Timestamp of when the group was updated. */
  updated_at: string;
  /** Timestamp of when the group membership was added. */
  membership_created_at: string;
  /** The method with which the group was assigned to the user. */
  assignment: string;
};
type CheckGroupMembershipResponse = {
  /** Map of group identifiers (ID or name) to membership details including status and matching groups */
  memberships: {
    [key: string]: {
      /** Whether the user is a member of this group */
      is_member: boolean;
      /** Array of matching groups when is_member is true */
      matches?: {
        /** Unique identifier of the group. */
        id: string;
        /** Name of the Group */
        name: string;
        /** Can be `connection`, `organization` or `tenant` */
        group_type: string;
      }[];
    };
  };
  /** Map of group identifiers to error codes for groups that couldn't be checked */
  errors?: {
    [key: string]: string;
  };
};
/**
 * Parameters for fetching user effective roles with checkpoint pagination.
 */
type GetUserEffectiveRolesParams = {
  /** The maximum number of roles to return (up to 100). */
  take?: number;
  /** Pagination token from the previous response's `next` field. Use this to retrieve the next page of results. */
  from?: string;
};
/**
 * Response type for fetching user effective roles with checkpoint pagination.
 */
type GetUserEffectiveRolesResponse = {
  /** The list of user roles. */
  roles: Role[];
  /** A cursor for pagination. */
  next?: string;
};
/**
 * Response type for fetching user effective roles filtered by IDs or names.
 */
type FilteredUserEffectiveRolesResponse = {
  /** The list of user roles. */
  roles: Role[];
};
type Role = {
  /** Unique identifier of the role. */
  id: string;
  /** Name of the Role. */
  name: string;
  /** Type of the Role. */
  type: string;
};
/**
 * Describes the type of authentication factor (and its options) that can be used to
 * challenge a user.
 */
type FactorSelector =
  | {
      /** A type of authentication factor such as `push-notification`, `phone`, `email`, `otp`, `webauthn-roaming`, `webauthn-platform`, and `recovery-code`. */
      type: 'otp' | 'email' | 'webauthn-platform' | 'webauthn-roaming' | 'recovery-code';
      /** Additional options for configuring a factor of a given type. */
      options?: {
        [key: string]: unknown;
      };
    }
  | {
      /** A type of authentication factor such as `phone`. */
      type: 'phone';
      /** Additional options for configuring the phone factor. */
      options?: {
        /** The method passed in this field will be preferred over the others if available. */
        preferredMethod?: 'sms' | 'voice' | 'both';
      };
    }
  | {
      /** A type of authentication factor such as `push-notification`. */
      type: 'push' | 'push-notification';
      /** Additional options for configuring the push factor. */
      options?: {
        /** If this is set to false, the OTP fallback method for the push factor will not be available for the user. */
        otpFallback?: boolean;
      };
    };
/**
 * Describes the type of authentication factor (and its options) that can be used to
 * enroll a user.
 */
type EnrollmentFactorSelector =
  | {
      /** A type of authentication factor such as `push-notification`, `phone`, `otp`, `webauthn-roaming`, `webauthn-platform`, and `recovery-code`. */
      type:
        | 'otp'
        | 'webauthn-platform'
        | 'webauthn-roaming'
        | 'push'
        | 'push-notification'
        | 'recovery-code';
      /** Additional options for configuring a factor of a given type. */
      options?: {
        [key: string]: unknown;
      };
    }
  | {
      /** A type of authentication factor such as `phone`. */
      type: 'phone';
      /** Additional options for configuring the phone factor. */
      options?: {
        /** The method passed in this field will be preferred over the others if available. */
        preferredMethod?: 'sms' | 'voice' | 'both';
      };
    };
type MultifactorProvider = 'none' | 'guardian' | 'google-authenticator' | 'duo' | 'any';
interface DuoMultifactorProviderOptions {
  /** This is the API hostname value from your Duo account. */
  host: string;
  /** This is the Client ID (previously Integration key) value from your Duo account. */
  ikey: string;
  /** This is the Client secret (previously Secret key) value from your Duo account. */
  skey: string;
  /** Use some attribute of the profile as the username in DuoSecurity. This is also useful if you already have your users enrolled in Duo. */
  username?: string;
}
interface RequireMultifactorAuthOptions {
  allowRememberBrowser?: boolean;
  providerOptions?: DuoMultifactorProviderOptions;
}
interface ChallengeWithOptions {
  additionalFactors?: FactorSelector[];
}
interface EnrollWithOptions {
  additionalFactors?: EnrollmentFactorSelector[];
}
interface SessionRevocationOptions {
  /** Default to false. If true, the system ends the session and keeps the refresh tokens. The application may continue to get access tokens for the duration of the refresh token lifetime. */
  preserveRefreshTokens?: boolean;
}
type SAMLAttributeValue = string | number | boolean | Array<string | number | boolean> | null;
interface ValidationAPI {
  /**
   * Throw an error when there is a validation error.
   *
   * @param errorCode A customer defined error code for the validation error.
   *
   * @param errorMessage A customer defined message for the validation error.
   */
  error(errorCode: string, errorMessage: string): PostLoginAPI;
}
interface Secrets {
  [secretName: string]: string;
}
interface Configuration {}
interface Event extends PostLoginV3Event {
  /**
   * @private Configuration values associated with this Action.
   */
  readonly configuration: Configuration;
  /**
   * Secret values securely associated with this Action.
   */
  readonly secrets: Secrets;
}
interface AccessAPI {
  /**
   * Mark the current login attempt as denied. This will prevent the end-user from completing
   * the login flow. This will *NOT* cancel other user-related side-effects (such as metadata
   * changes) requested by this Action. The login flow will immediately stop following the
   * completion of this action and no further Actions will be executed.
   *
   * @param reason A human-readable explanation for rejecting the login. This may be presented
   * directly in end-user interfaces.
   */
  deny(reason: string): PostLoginAPI;
}
interface AccessTokenAPI {
  /**
   * Set a custom claim on the Access Token that will be issued upon completion of the login flow.
   *
   * @param key Name of the claim (note that this may need to be a fully-qualified url).
   * @param value The value of the claim.
   */
  setCustomClaim(key: string, value: unknown): PostLoginAPI;
  /**
   * Add a scope on the Access Token that will be issued upon completion of the login flow.
   *
   * @param scope The scope to be added.
   * @throws will throw an error if scope is invalid
   */
  addScope(scope: string): void;
  /**
   * Remove a scope on the Access Token that will be issued upon completion of the login flow.
   *
   * @param scope The scope to be removed.
   * @throws will throw an error if scope is invalid
   */
  removeScope(scope: string): void;
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
   * @param options Additional options which can also specify `additionalFactors` as a property. Factor-specific options (for example `otpFallback` for `push-notification`) belong on `factor.options`.
   *
   * @example
   * Challenge with a specific factor:
   * ```js
   * api.authentication.challengeWith({
   *   type: 'phone',
   *   options: { preferredMethod: 'both' }
   * });
   * ```
   *
   * @example
   * Challenge with additional factors:
   * ```js
   * api.authentication.challengeWith({
   *   type: 'otp'
   * }, {
   *   additionalFactors: [{
   *     type: 'push-notification'
   *   }, {
   *     type: 'phone'
   *   }]
   * });
   * ```
   *
   * @example
   * Challenge with push notification and disable OTP fallback:
   * ```js
   * api.authentication.challengeWith({
   *   type: 'push-notification',
   *   options: { otpFallback: false }
   * });
   * ```
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
  /**
   * Request an enrollment for multifactor authentication using the supplied factor and optional additional factors.
   *
   * When a multifactor enrollment is requested, subsequent Actions will not be run until that enrollment has been
   * fulfilled by the user.
   *
   * If any of the factors requested has already been enrolled or challenged successfully in the current transaction, it will
   * be ignored.
   *
   * If a factor that is not enabled in the tenant is requested, it will be ignored.
   * If a factor that the user has already enrolled is requested, it will be ignored.
   * If none of the requested factors is enabled and not enrolled, the authentication
   * transaction will fail (i.e. login will not complete).
   *
   * @param factor An object describing the type of factor that should be used for the initial enrollment prompts and its options.
   * @param options Additional options which can also specify `additionalFactors` as a property.
   *
   * @example
   * Enroll with additional factors:
   * ```js
   * api.authentication.enrollWith({
   *   type: 'otp'
   * }, {
   *   additionalFactors: [{
   *     type: 'push-notification'
   *   }, {
   *     type: 'phone'
   *   }]
   * });
   * ```
   */
  enrollWith(factor: EnrollmentFactorSelector, options?: EnrollWithOptions): void;
  /**
   *
   * Request an enrollment for multifactor authentication using any of the supplied factors (showing a factor selection
   * screen first).
   *
   * When a multifactor enrollment is requested, subsequent Actions will not be run until that enrollment has been
   * fulfilled by the user.
   *
   * If any of the factors requested has already been enrolled successfully in the current transaction, it will
   * be ignored.
   *
   * If a factor that is not enabled in the tenant is requested, it will be ignored.
   * If a factor that the user has already enrolled is requested, it will be ignored.
   * If none of the requested factors is enabled and not enrolled, the authentication
   * transaction will fail (i.e. login will not complete).
   *
   * _**Note**: If there is a preferred factor, the `api.authentication.enrollWith()` method
   * is preferred. The factor selector screen will not be shown if only one factor is passed in or is valid._
   *
   * @param factors An array of additional factors.
   */
  enrollWithAny(factors: EnrollmentFactorSelector[]): void;
  /**
   * Indicate that a custom authentication method has been completed in the current
   * session. This method will then be available in the `event.authentication.methods`
   * array in subsequent logins.
   *
   * **IMPORTANT**: This API is only available from within the `onContinuePostLogin`
   * function for `PostLogin` Actions. In other words, this may be used to record the
   * completion of a custom authentication method after redirecting the user via
   * `api.redirect.sendUserTo()`.
   *
   * @param provider_url An `http:` or `https:` URL that uniquely represents the completed
   * authentication method.
   */
  recordMethod(provider_url: string): PostLoginAPI;
  /**
   * Change the primary user for the login transaction.
   *
   * In scenarios that require linking users, the user identity used to initiate the login may no longer
   * exist as a discrete user. That identity may now be a secondary identity of an existing user. In
   * such situations, the `setPrimaryUser()` function can be used to indicate that the subject of the
   * login should be changed.
   *
   * **IMPORTANT**: Insecurely linking accounts can allow malicious actors to access legitimate
   * user accounts.
   *
   * **IMPORTANT**: The identity used to authenticate the login _must_ be among the secondary identities
   * of the user referenced by `primary_user_id`. The login will fail and tokens will not be issued
   * otherwise.
   *
   * @param primary_user_id The user ID of the user for whom tokens should be issued (the `sub` claim).
   */
  setPrimaryUser(primary_user_id: string): void;
}
interface GroupsAPI {
  /**
   * Get the paginated list of the groups the user belongs to.
   *
   * @param params - An object containing pagination options.
   * @param params.take - The number of groups to retrieve.
   * @param params.from - The cursor for pagination.
   */
  getUserGroups(params?: GetUserGroupsParams): Promise<ListUserGroupsResponse>;
  /**
   * Checks if the user is a member of any of the specified groups and provides details
   * about the matching groups if the user is a member.
   * @param groups - An array of group identifiers (IDs or names) to check membership against.
   */
  hasGroupMembership(groups: string[]): Promise<CheckGroupMembershipResponse>;
}
interface IdTokenAPI {
  /**
   * Set a custom claim on the ID Token that will be issued upon completion of the login flow.
   *
   * @param key Name of the claim (note that this may need to be a fully-qualified url).
   * @param value The value of the claim.
   */
  setCustomClaim(key: string, value: unknown): PostLoginAPI;
}
interface EnableMultifactorOptions<T> {
  /**
   * When provider is set to `google-authenticator` or `duo`, the user is prompted for MFA once
   * every 30 days. When provider is set to `guardian`, the MFA prompt displays the enrollment
   * checkbox for users to choose whether or not to enroll. Defaults to `false`. To learn more,
   * read [Customize Multi-Factor Authentication Pages](https://auth0.com/docs/secure/multi-factor-authentication/customize-mfa).
   */
  allowRememberBrowser?: boolean;
  /**
   * Additional options to configure the challenge, only available for the `duo` provider.
   */
  providerOptions?: T extends 'duo' ? RequireMultifactorAuthOptions['providerOptions'] : never;
}
interface MultifactorAPI {
  /**
   * Enable multifactor authentication for this login flow. When enabled, users must complete the
   * configured multifactor challenge. The actual multifactor challenge will be deferred to the
   * end of the login flow.
   *
   * @param provider The name of the multifactor provider to use or the value `"any"` to use any
   * of the configured providers.
   * @param options Additional options for enabling multifactor challenges.
   */
  enable<T extends MultifactorProvider>(
    provider: T,
    options?: EnableMultifactorOptions<T>
  ): PostLoginAPI;
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
   * Cause the login pipeline to trigger a browser redirect to the target `url` immediately after
   * this action completes. The `createUrl` helper method is provided to simplify encoding
   * data as a query parameter in the target `url` such that the data's authenticity and
   * integrity can be verified by the target endpoint.
   *
   * @param baseUrl The url to which to redirect the user.
   */
  sendUserTo(url: string, options?: SendUserToOptions): PostLoginAPI;
  /**
   * Indicates if the current transaction is eligibile for a user redirect. Certain protocols such
   * as `oauth2-resource-owner`, `oauth2-refresh-token` do not support
   * redirecting the user. A request with `prompt=none` is also not eligible for a redirect.
   *
   * @deprecated The `canRedirect` method should not be relied upon to determine whether a
   * redirect is allowed or not in this flow. Instead, it is recommended that clients
   * appropriately handle any `interaction_required` errors arising from a redirect requested
   * in a non-interactive flow.
   *
   * @returns A boolean indicating if the current transaction is eligible for redirects.
   */
  canRedirect(): boolean;
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
interface RefreshTokenAPI {
  /**
   * [Enterprise Customers] Revoke the current user refresh token and mark the current refresh token exchange attempt as denied. This will prevent
   * the end-user from completing the refresh token exchange flow and revoke the currently used refresh token.
   * The refresh token exchange flow will immediately stop following the completion of this action and no further Actions will be executed.
   *
   * This method can be used only during Refresh Token Exchange flow, when `event.transaction.protocol === "oauth2-refresh-token"`.
   *
   * @param reason A human-readable explanation for rejecting the refresh token exchange. This may be presented
   * directly in end-user interfaces.
   */
  revoke(reason: string): void;
  /**
   * [Enterprise Customers] Sets a new absolute expiration time for the current refresh token.
   * The expiration cannot be set higher than the maximum refresh token lifetime set in the settings.
   * When called multiple times, the earliest expiration time will be used.
   *
   * @param absolute Required, the new absolute expiration time in milliseconds since the unix epoch, after which the Refresh Token will be considered invalid.
   */
  setExpiresAt(absolute: number): void;
  /**
   * [Enterprise Customers] Sets a new idle expiration time for the current refresh token.
   * The expiration cannot be set higher than the maximum absolute refresh token lifetime set in the settings.
   * When called multiple times, the earliest expiration time will be used.
   *
   * @param inactivity Required, the new idle inactivity time in milliseconds since the unix epoch, after which the Refresh Token will be considered invalid
   * if it is not used during this period.
   */
  setIdleExpiresAt(inactivity: number): void;
  /**
   * Sets a key value pair in the metadata object of the current refresh token.
   *
   * @param key Required, the key to set in the metadata object.
   * @param value Required, the value to set for the key in the metadata object, null values will delete the provided metadata key.
   * @throws Will throw an error if the resulting metadata object is invalid.
   */
  setMetadata(key: string, value: string | null): void;
  /**
   * Deletes a key in the metadata object of the current refresh token.
   *
   * @param key Required, the key to delete from the metadata object.
   */
  deleteMetadata(key: string): void;
  /**
   * Deletes all keys from the metadata object of the current refresh token.
   */
  evictMetadata(): void;
}
interface RolesAPI {
  /**
   * Returns all roles assigned to a user, directly or through group membership,
   * optionally scoped to an organization, using checkpoint pagination.
   *
   * @param params - Checkpoint pagination parameters.
   * @param params.take - The maximum number of roles to return (up to 100).
   * @param params.from - Pagination token from the previous response's `next` field.
   * @returns An object containing up to 100 effective roles and a pagination cursor
   *
   * @example
   * Fetch the first page of roles:
   * ```js
   * const result = await api.roles.getUserEffectiveRoles({ take: 50 });
   * console.log(result.roles);
   * ```
   *
   * @example
   * Paginate through roles:
   * ```js
   * let cursor;
   * do {
   *   const result = await api.roles.getUserEffectiveRoles({ take: 100, from: cursor });
   *   console.log(result.roles);
   *   cursor = result.next;
   * } while (cursor);
   * ```
   */
  getUserEffectiveRoles(
    params?: GetUserEffectiveRolesParams
  ): Promise<GetUserEffectiveRolesResponse>;
  /**
   * Returns roles assigned to a user, directly or through group membership,
   * optionally scoped to an organization, filtered by role IDs.
   *
   * @param ids - Array of role IDs to filter by (up to 100).
   * @returns An object containing the filtered list of effective roles.
   *
   * @example
   * Filter roles by specific IDs:
   * ```js
   * const result = await api.roles.getUserEffectiveRolesByIds([
   *   'rol_1234567890',
   *   'rol_0987654321'
   * ]);
   * console.log(result.roles);
   * ```
   */
  getUserEffectiveRolesByIds(ids: string[]): Promise<FilteredUserEffectiveRolesResponse>;
  /**
   * Returns roles assigned to a user, directly or through group membership,
   * optionally scoped to an organization, filtered by role names.
   *
   * @param names - Array of role names to filter by (up to 50).
   * @returns An object containing the filtered list of effective roles.
   *
   * @example
   * Filter roles by specific names:
   * ```js
   * const result = await api.roles.getUserEffectiveRolesByNames([
   *   'Admin',
   *   'Editor'
   * ]);
   * console.log(result.roles);
   * ```
   */
  getUserEffectiveRolesByNames(names: string[]): Promise<FilteredUserEffectiveRolesResponse>;
}
interface RulesAPI {
  /**
   * Check whether a Rule with a specific ID has been executed in the current transaction.
   *
   * @param ruleId The Rule ID.
   */
  wasExecuted(ruleId: string): boolean;
}
interface SAMLResponseAPI {
  /**
   * Set attributes on the SAML assertion being issued to the authenticated user.
   *
   * @param attribute The SAML attribute to be set.
   * @param value The value of the SAML claim. Setting this value to `null` or
   * `undefined` will remove the claim from the assertion.
   */
  setAttribute(attribute: string, value: SAMLAttributeValue): void;
  /**
   * Audience of the SAML assertion.
   * Default is issuer on SAMLRequest.
   */
  setAudience(audience: string): void;
  /**
   * Recipient of the SAML assertion (SubjectConfirmationData).
   * Default is AssertionConsumerUrl on SAMLRequest or callback URL if no SAMLRequest was sent.
   */
  setRecipient(recipient: string): void;
  /**
   * Whether or not a UPN claim should be created. Default is true.
   */
  setCreateUpnClaim(createUpnClaim: boolean): void;
  /**
   * If true (default), for each claim that is not mapped to the common profile, Auth0 passes through those in the output assertion.
   * If false, those claims won't be mapped.
   */
  setPassthroughClaimsWithNoMapping(passthroughClaimsWithNoMapping: boolean): void;
  /**
   * If passthroughClaimsWithNoMapping is true and this is false (default), for each claim not mapped to the common profile Auth0 adds a prefix `http://schema.auth0.com`.
   * If true it will pass through the claim as-is.
   */
  setMapUnknownClaimsAsIs(mapUnknownClaimsAsIs: boolean): void;
  /**
   * If true (default), it adds more information in the token such as the provider (Google, ADFS, AD, etc.) and the access token, if available.
   */
  setMapIdentities(mapIdentities: boolean): void;
  /**
   * Signature algorithm to sign the SAML assertion or response.
   * Default is rsa-sha256.
   */
  setSignatureAlgorithm(signatureAlgorithm: 'rsa-sha256'): void;
  /**
   * @deprecated Use rsa-sha256 instead, rsa-sha1 is not recommended.
   */
  setSignatureAlgorithm(signatureAlgorithm: 'rsa-sha1'): void;
  /**
   * Digest algorithm to calculate digest of the SAML assertion or response.
   * Default is sha256.
   */
  setDigestAlgorithm(digestAlgorithm: 'sha256'): void;
  /**
   * @deprecated Use 'sha256' instead, 'sha1' is not recommended.
   */
  setDigestAlgorithm(digestAlgorithm: 'sha1'): void;
  /**
   * Destination of the SAML response. If not specified, it will be AssertionConsumerUrl of SAMLRequest or callback URL if there was no SAMLRequest.
   */
  setDestination(destination: string): void;
  /**
   * Expiration of the token.
   * Default is 3600 seconds (1 hour).
   */
  setLifetimeInSeconds(lifetimeInSeconds: number): void;
  /**
   * Whether or not the SAML response should be signed.
   * By default the SAML assertion will be signed, but not the SAML response.
   * If true, SAML Response will be signed instead of SAML assertion.
   * Default to false.
   */
  setSignResponse(signResponse: boolean): void;
  /**
   * Default is urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified.
   */
  setNameIdentifierFormat(nameIdentifierFormat: string): void;
  /**
   * Auth0 will try each of the attributes of this array in order.
   * If one of them has a value, it will use that for the Subject/NameID.
   *
   * The order is:
   *   - http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier (mapped from user_id),
   *   - http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress (mapped from email),
   *   - http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name (mapped from name).
   */
  setNameIdentifierProbes(nameIdentifierProbes: string[]): void;
  /**
   * Default is urn:oasis:names:tc:SAML:2.0:ac:classes:unspecified.
   */
  setAuthnContextClassRef(authnContextClassRef: string): void;
  /**
   * Optionally indicates the public key certificate used to validate SAML requests.
   * If set, SAML requests will be required to be signed.
   * A sample value would be "-----BEGIN CERTIFICATE-----\nMIIC8jCCAdqgAwIBAgIJObB6jmhG0QIEMA0GCSqGSIb3DQEBBQUAMCAxHjAcBgNV\n[..all the other lines..]-----END CERTIFICATE-----\n".
   */
  setSigningCert(signingCert: string): void;
  /**
   * When set to true, we infer the NameFormat based on the attribute name. NameFormat values are urn:oasis:names:tc:SAML:2.0:attrname-format:uri, urn:oasis:names:tc:SAML:2.0:attrname-format:basic and urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified.
   * If set to false, the attribute NameFormat is not set in the assertion.
   * Default is true.
   */
  setIncludeAttributeNameFormat(includeAttributeNameFormat: boolean): void;
  /**
   * When set to true, we infer the xs:type of the element. Types are xs:string, xs:boolean, xs:double and xs:anyType.
   * When set to false all xs:type are xs:anyType.
   * Default is true.
   */
  setTypedAttributes(typedAttributes: boolean): void;
  /**
   * Optionally specify a certificate used to encrypt the SAML assertion.
   * The certificate should be obtained from the service provider.
   * Both the certificate and public key must be specified.
   * A sample value would be "-----BEGIN CERTIFICATE-----\nMIIC8jCCAdqgAwIBAgIJObB6jmhG0QIEMA0GCSqGSIb3DQEBBQUAMCAxHjAcBgNV\n[..all the other lines..]-----END CERTIFICATE-----\n".
   */
  setEncryptionCert(encryptionCert: string): void;
  /**
   * Optionally specify a public key used to encrypt the SAML assertion.
   * The public key should be obtained from the service provider.
   * Both the public key and certificate must be specified.
   * A sample value would be "-----BEGIN PUBLIC KEY-----\nnMIIC8jCCAdqgAwIBAgIJObB6jmhG0QIEMA0GCSqGSIb3DQEBBQUAMCAxHjAcBgNV\n[..all the other lines..]-----END PUBLIC KEY-----\n".
   */
  setEncryptionPublicKey(encryptionPublicKey: string): void;
  /**
   * By default, Auth0 will use the private/public key pair assigned to your tenant to sign SAML responses or assertions.
   * For very specific scenarios, you might wish to provide your own certificate and private key.
   *
   * Both the certificate and private key must be specified.
   * A sample value would be "-----BEGIN CERTIFICATE-----\nMIIC8jCCAdqgAwIBAgIJObB6jmhG0QIEMA0GCSqGSIb3DQEBBQUAMCAxHjAcBgNV\n[..all the other lines..]-----END CERTIFICATE-----\n".
   */
  setCert(cert: string): void;
  /**
   * By default, Auth0 will use the private/public key pair assigned to your tenant to sign SAML responses or assertions.
   * For very specific scenarios, you might wish to provide your own certificate and private key.
   *
   * Since this private key is sensitive, **we recommend using the Add Secret functionality of Actions**.
   * See here for more details: https://auth0.com/docs/customize/actions/write-your-first-action#add-a-secret
   *
   * Both the certificate and private key must be specified.
   * A sample value would be "-----BEGIN PRIVATE KEY-----\nnMIIC8jCCAdqgAwIBAgIJObB6jmhG0QIEMA0GCSqGSIb3DQEBBQUAMCAxHjAcBgNV\n[..all the other lines..]-----END PRIVATE KEY-----\n".
   */
  setKey(key: string): void;
  /**
   * Optionally specify a RelayState used to return to service provider
   */
  setRelayState(relayState: string): void;
  /**
   * Optionally specify the issuer of the SAML assertion.
   * Default is urn:auth0:TENANT
   */
  setIssuer(issuer: string): void;
  /**
   * Set encryption algorithm for SAML assertion.
   * Default is aes256-cbc.
   *
   * @param encryptionAlgorithm - The algorithm to use (aes256-gcm is recommended)
   *
   * @example
   * Set the encryption algorithm to aes256-gcm (recommended)
   * ```js
   * api.samlResponse.setEncryptionAlgorithm('aes256-gcm');
   * ```
   */
  setEncryptionAlgorithm(encryptionAlgorithm: 'aes256-gcm'): void;
  /**
   * @deprecated Use 'aes256-gcm' instead, 'aes256-cbc' is not recommended and insecure.
   * @param encryptionAlgorithm - The algorithm to use (aes256-cbc is deprecated)
   *
   * @example
   * Set encryption algorithm to aes256-cbc (not recommended)
   * ```js
   * api.samlResponse.setEncryptionAlgorithm('aes256-cbc');
   * ```
   */
  setEncryptionAlgorithm(encryptionAlgorithm: 'aes256-cbc'): void;
}
interface SessionAPI {
  /**
   * [Enterprise Customers] Revoke the current user session and mark the current login attempt as denied. This will prevent
   * the end-user from completing the login flow and revoke their session. The login flow will immediately
   * stop following the completion of this action and no further Actions will be executed.
   *
   * @param reason A human-readable explanation for rejecting the login. This may be presented
   * directly in end-user interfaces.
   *
   * @param options
   *
   * @example
   * Revoke the session while preserving refresh tokens:
   * ```js
   * api.session.revoke('reason', { preserveRefreshTokens: true });
   * ```
   */
  revoke(reason: string, options?: SessionRevocationOptions): void;
  /**
   * [Enterprise Customers] Sets a new absolute expiration time for the current session.
   * The expiration cannot be set higher than the maximum session lifetime set in the tenant settings.
   * When called multiple times, the earliest expiration time will be used.
   *
   * @param absolute Required, the new absolute expiration time in milliseconds since the unix epoch, after which the Session will be considered invalid.
   */
  setExpiresAt(absolute: number): void;
  /**
   * [Enterprise Customers] Sets a new idle expiration time for the current session.
   * The expiration cannot be set higher than the maximum absolute session lifetime set in the tenant settings.
   * When called multiple times, the earliest expiration time will be used.
   *
   * @param inactivity Required, the new inactivity expiration time in milliseconds since the unix epoch, after which the Session will be considered invalid if there
   * is no user interaction during this period.
   */
  setIdleExpiresAt(inactivity: number): void;
  /**
   * [Enterprise Customers] [Early Access] Sets the cookie mode for the current session, allowing it to be either 'persistent' or 'non-persistent' (ephemeral).
   * This determines how the session cookie is handled in the browser:
   * - 'persistent': The cookie will be stored until it expires or is deleted by the user.
   * - 'non-persistent' (ephemeral): The cookie will be deleted when the browser is closed.
   *
   * If multiple setCookieMode invocations are made, only the last one will take effect. In case 'non-persistent' is set, the cookie will be deleted when the browser is closed, however, the session itself will remain valid until its absolute or idle expiration time is reached
   * or the session is revoked through our available APIs. For more information on cookie modes, please refer to our documentation.
   *
   * @param mode Required, the cookie mode for the current session.
   * Can be either 'persistent' or 'non-persistent' (ephemeral).
   */
  setCookieMode(mode: 'persistent' | 'non-persistent'): void;
  /**
   * [Enterprise Customers] [Early Access] Sets a key value pair in the metadata object of the current session.
   *
   * @param key Required, the key to set in the metadata object.
   * @param value Required, the value to set for the key in the metadata object, null values will delete the provided metadata key.
   * @throws will throw an error if the resulting metadata object is invalid.
   */
  setMetadata(key: string, value: string | null): void;
  /**
   * [Enterprise Customers] [Early Access] Deletes a key in the metadata object of the current session.
   *
   * @param key Required, the key to delete from the metadata object.
   */
  deleteMetadata(key: string): void;
  /**
   * [Enterprise Customers] [Early Access] Deletes all keys from the metadata object of the current session.
   *
   */
  evictMetadata(): void;
}
interface TransactionAPI {
  /**
   * Store or update the value in the transaction metadata for a specified key.
   *
   * Metadata modified using this method is updated in real-time in the
   * `event.transaction.metadata` object.
   *
   * @param key The key of the property to be set.
   * @param value The value of the property. This may be set to `null` to remove the
   * metadata property.
   */
  setMetadata(key: string, value: TxMetadataValue | null): void;
}
interface UserAPI {
  /**
   * Set application-specific metadata for the user that is logging in.
   *
   * Note: This method should not be used in callbacks. Invoking this method won't update the metadata immediately.
   * You can call this several times throughout multiple actions of the same flow and the engine will aggregate the
   * changes and update the metadata at once before the flow is completed. This function works only with metadata that
   * are in the object format.
   *
   * @param key The metadata property to be set.
   * @param value The value of the metadata property. This may be set to `null` to remove the
   * metadata property.
   */
  setAppMetadata(key: string, value: unknown): PostLoginAPI;
  /**
   * Set general metadata for the user that is logging in.
   *
   * Note: This method should not be used in callbacks. Invoking this method won't update the metadata immediately.
   * You can call this several times throughout multiple actions of the same flow and the engine will aggregate the
   * changes and update the metadata at once before the flow is completed. This function works only with metadata that
   * are in the object format.
   *
   * @param key The metadata property to be set.
   * @param value The value of the metadata property. This may be set to `null` to remove the
   * metadata property.
   */
  setUserMetadata(key: string, value: unknown): PostLoginAPI;
}
/**
 * Methods and utilities to help change the behavior of the login flow.
 */
interface PostLoginAPI {
  /**
   * Modify the access of the user that is logging in, such as rejecting the login attempt.
   */
  readonly access: AccessAPI;
  /**
   * Request changes to the access token being issued.
   */
  readonly accessToken: AccessTokenAPI;
  /**
   * Request changes to the authentication state of the current user's session.
   */
  readonly authentication: AuthenticationAPI;
  /**
   * Request changes to the ID token being issued.
   */
  readonly idToken: IdTokenAPI;
  /**
   * Set or remove the requirement for multifactor authentication on the login attempt.
   */
  readonly multifactor: MultifactorAPI;
  /**
   * Configure and initiate external redirects.
   */
  readonly redirect: RedirectAPI;
  /**
   * Make changes to the metadata of the user that is logging in.
   */
  readonly user: UserAPI;
  /**
   * Make changes to the cache.
   */
  readonly cache: CacheAPI;
  /**
   * Configure custom SAML configurations and attributes.
   */
  readonly samlResponse: SAMLResponseAPI;
  /**
   * Prevent user from logging in by throwing a validation error.
   */
  readonly validation: ValidationAPI;
  /**
   * Identify if a rule has been executed in the current transaction.
   */
  readonly rules: RulesAPI;
  /**
   * Renders a custom prompt.
   */
  readonly prompt: PromptAPI;
  /**
   * Request changes to the current user's refresh token.
   */
  readonly refreshToken: RefreshTokenAPI;
  /**
   * Request changes to the current user's session.
   */
  readonly session: SessionAPI;
  /**
   * Make changes to the transaction.
   */
  readonly transaction: TransactionAPI;
  /**
   * Get information about user groups membership.
   */
  readonly groups: GroupsAPI;
  /**
   * Get information about user roles assignments.
   */
  readonly roles: RolesAPI;
}
interface PostLoginAction {
  (event: Event, api: PostLoginAPI): Promise<void>;
}
type PostLoginModule = {
  onExecutePostLogin: PostLoginAction;
  onContinuePostLogin: PostLoginAction;
};
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
