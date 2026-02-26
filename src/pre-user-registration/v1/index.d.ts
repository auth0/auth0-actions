/** PreUserRegistrationV1Event */
type PreUserRegistrationV1Event = {
  command?: {
    /** Prevent a user from registering */
    type: 'deny';
    /** The message field controls the error message seen by the user who is attempting to register. */
    message: string;
    /** The reason field controls the error message that appears in your tenant logs. */
    reason: string;
  };
  connection: {
    /** The connection's unique identifier. */
    id?: string;
    /** The name of the connection used to authenticate the user (such as `twitter` or `some-g-suite-domain`). */
    name?: string;
  };
  renderLanguage?: string;
  request: {
    /** The originating IP address of the request. */
    ip: string;
    language?: string;
  } & {
    [additionalProperties: string]: any;
  };
  requestLanguage?: string;
  /** Details about the Tenant associated with the current transaction. */
  tenant: {
    /** The name of the tenant. */
    id: string;
  };
  user: {
    /** Custom fields that store info about a user that influences the user's access, such as support plan, security roles, or access control groups. */
    app_metadata?: {
      [additionalProperties: string]: any;
    };
    /** (unique) User's email address. */
    email?: string;
    /** Indicates whether the user has verified their email address. */
    emailVerified?: boolean;
    /** Unecrypted password */
    password?: string;
    /** User's phone number. */
    phoneNumber?: string;
    /** Indicates whether the user has verified their phone number. */
    phoneNumberVerified?: boolean;
    /** The name of the tenant. */
    tenant?: string;
    /** Custom fields that store info about a user that does not impact what they can or cannot access, such as work address, home address, or user preferences. */
    user_metadata?: {
      [additionalProperties: string]: any;
    };
    /** (unique) User's username. */
    username?: string;
  };
};
/** PreUserRegistrationV1Result */
type PreUserRegistrationV1Result = {
  command?: {
    /** Prevent a user from registering */
    type: 'deny';
    /** The message field controls the error message seen by the user who is attempting to register. */
    message: string;
    /** The reason field controls the error message that appears in your tenant logs. */
    reason: string;
  };
  user?: {
    /** Custom fields that store info about a user that influences the user's access, such as support plan, security roles, or access control groups. */
    app_metadata?: {
      [additionalProperties: string]: any;
    };
    /** Custom fields that store info about a user that does not impact what they can or cannot access, such as work address, home address, or user preferences. */
    user_metadata?: {
      [additionalProperties: string]: any;
    };
  } & {
    [additionalProperties: string]: any;
  };
};
interface Event extends PreUserRegistrationV1Event {}
interface Secrets {
  [secretName: string]: string;
}
interface Context {
  secrets: Secrets;
}
interface Result extends PreUserRegistrationV1Result {}
interface PreUserRegistrationAction {
  (event: Event, context: Context): Promise<Result | undefined>;
}
export type { Context, Event, PreUserRegistrationAction, Result, Secrets };
