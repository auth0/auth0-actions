/** PostChangePasswordV1Event */
type PostChangePasswordV1Event = {
  connection: {
    /** The connection's unique identifier. */
    id: string;
    /** The name of the connection used to authenticate the user (such as `twitter` or `some-g-suite-domain`). */
    name: string;
  } & {
    [additionalProperties: string]: any;
  };
  /** Details about the Tenant associated with the current transaction. */
  tenant: {
    /** The name of the tenant. */
    id: string;
  };
  user: {
    /** (unique) User's unique identifier. */
    id: string;
    /** (unique) User's email address. */
    email?: string;
    /** Timestamp indicating the last time the user's password was reset/changed. At user creation, this field does not exist. This property is only available for Database connections. */
    last_password_reset?: string;
    /** (unique) User's username. */
    username?: string;
  };
} & {
  [additionalProperties: string]: any;
};
/** PostChangePasswordResult */
type PostChangePasswordV1Result = {
  [property: string]: any;
};
interface Event extends PostChangePasswordV1Event {}
interface Secrets {
  [secretName: string]: string;
}
interface Context {
  secrets: Secrets;
}
interface Result extends PostChangePasswordV1Result {}
interface PostChangePasswordAction {
  (event: Event, context: Context): Promise<Result | undefined>;
}
export type { Context, Event, PostChangePasswordAction, Result, Secrets };
