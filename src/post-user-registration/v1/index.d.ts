/** PostUserRegistrationV1Event */
type PostUserRegistrationV1Event = {
  connection: {
    /** The connection's unique identifier. */
    id: string;
    /** The name of the connection used to authenticate the user (such as `twitter` or `some-g-suite-domain`). */
    name: string;
  };
  renderLanguage?: string;
  request?: {
    /** The originating IP address of the request. */
    ip?: string;
    language?: string;
  };
  requestLanguage?: string;
  /** Details about the Tenant associated with the current transaction. */
  tenant: {
    /** The name of the tenant. */
    id: string;
  };
  user: {
    /** (unique) User's unique identifier. */
    id: string;
    /** Custom fields that store info about a user that influences the user's access, such as support plan, security roles, or access control groups. */
    app_metadata?: {
      [additionalProperties: string]: any;
    };
    /** (unique) User's email address. */
    email?: string;
    /** Indicates whether the user has verified their email address. */
    emailVerified?: boolean;
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
/** PostUserRegistrationV1Result */
type PostUserRegistrationV1Result = {
  [property: string]: any;
};
interface Event extends PostUserRegistrationV1Event {}
interface Secrets {
  [secretName: string]: string;
}
interface Context {
  secrets: Secrets;
}
interface Result extends PostUserRegistrationV1Result {}
interface PostUserRegistrationAction {
  (event: Event, context: Context): Promise<Result | undefined>;
}
export type { Context, Event, PostUserRegistrationAction, Result, Secrets };
