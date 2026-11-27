interface Event {
  /** The flow that triggered this action. */
  action: ('enrollment' | 'second-factor-authentication') & string;
  client?: {
    /** The client id of the application the user is logging in to. */
    client_id?: string;
    /** An object for holding other application properties. */
    client_metadata?: {
      [key: string]: string;
    };
    /** The name of the application (as defined in the Dashboard). */
    name?: string;
  };
  /** One-time password that the user needs to use to enter in the form. */
  code: string;
  /** The originating IP address of the request. */
  ip?: string;
  language: string;
  /** How the message will be delivered, either by 'sms' or 'voice'. */
  message_type: ('sms' | 'voice') & string;
  /** Phone number where the message will be sent. */
  recipient: string;
  /** Content of the message to be sent. */
  text: string;
  user: {
    /** Custom fields that store info about a user that influences the user's access, such as support plan, security roles, or access control groups. */
    app_metadata?: {
      [key: string]: any;
    };
    /** (unique) User's email address. */
    email?: string;
    /** User's full name. */
    name?: string;
    /** (unique) User's unique identifier. */
    user_id?: string;
    /** Custom fields that store info about a user that does not impact what they can or cannot access, such as work address, home address, or user preferences. */
    user_metadata?: {
      [key: string]: any;
    };
    [key: string]: any;
  };
  user_agent: string;
  [key: string]: any;
}
interface Secrets {
  [secretName: string]: string;
}
interface Context {
  secrets: Secrets;
}
interface Result {}
interface SendPhoneMessageAction {
  (event: Event, context: Context): Promise<Result | undefined>;
}
export type { Context, Event, Result, Secrets, SendPhoneMessageAction };
