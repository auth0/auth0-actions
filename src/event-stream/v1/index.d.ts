type CacheWriteErrorCode =
  | 'MaxSideEffectsExceeded'
  | 'CacheKeySizeExceeded'
  | 'CacheValueSizeExceeded'
  | 'CacheSizeExceeded'
  | 'ItemAlreadyExpired'
  | 'InvalidExpiry'
  | 'FailedToSetCacheRecord'
  | 'FailedToDeleteCacheRecord'
  | 'CacheKeyDoesNotExist';
/**
 * Details about a cached value.
 */
interface CacheRecord {
  /**
   * The cached value itself.
   */
  value: string;
  /**
   * Expiry time in milliseconds since the unix epoch.
   */
  expires_at: number;
}
interface CacheWriteSuccess {
  type: 'success';
  record: CacheRecord;
}
interface CacheWriteError {
  type: 'error';
  code: CacheWriteErrorCode;
}
type CacheWriteResult = CacheWriteSuccess | CacheWriteError;
interface CacheDeleteSuccess {
  type: 'success';
}
type CacheDeleteResult = CacheDeleteSuccess | CacheWriteError;
interface CacheSetOptions {
  /**
   * The absolute expiry time in milliseconds since the unix epoch.
   * While cached records may be evicted earlier, they will
   * never remain beyond the supplied `expires_at`.
   *
   * *Note*: This value should not be supplied if a value was also
   * provided for `ttl`. If both options are supplied, the
   * earlier expiry of the two will be used.
   */
  expires_at?: number;
  /**
   * The time-to-live value of this cache entry in milliseconds.
   * While cached values may be evicted earlier, they will
   * never remain beyond the supplied `ttl`.
   *
   * *Note*: This value should not be supplied if a value was also
   * provided for `expires_at`. If both options are supplied, the
   * earlier expiry of the two will be used.
   */
  ttl?: number;
}
/**
 * Methods and utilities to manage the Actions cache.
 */
interface CacheAPI {
  /**
   * Delete a record describing a cached value at the supplied
   * key if it exists.
   *
   * @param key The key of the cache record to delete.
   */
  delete(key: string): CacheDeleteResult;
  /**
   * Retrieve a record describing a cached value at the supplied key,
   * if it exists. If a record is found, the cached value can be found
   * at the `value` property of the returned object.
   *
   * @param key The key of the record stored in the cache.
   */
  get(key: string): CacheRecord | undefined;
  /**
   * Store or update a string value in the cache at the specified key.
   *
   * Values stored in this cache are scoped to the Trigger in which they
   * are set. They are subject to the {@link https://auth0.com/docs/customize/actions/limitations Actions Cache Limits}.
   *
   * Values stored in this way will have lifetimes of _up to_ the specified
   * `ttl` or `expires_at` values. If no lifetime is specified, a default of
   * lifetime of 15 minutes will be used. Lifetimes may not exceed the maximum
   * duration listed at {@link https://auth0.com/docs/customize/actions/limitations Actions Cache Limits}.
   *
   * **Important**: This cache is designed for short-lived, ephemeral data. Items may not be
   * available in later transactions even if they are within their supplied their lifetime.
   *
   * @param key The key of the record to be stored.
   * @param value The value of the record to be stored.
   * @param options Options for adjusting cache behavior.
   */
  set(key: string, value: string, options?: CacheSetOptions): CacheWriteResult;
}
/**
 * Methods and utilities to help change the behaviour of the event stream flow.
 */
interface EventStreamAPI {
  /**
   * Store and retrieve data that persists across executions.
   */
  readonly cache: CacheAPI;
}
/** EventStreamV1Event */
type EventStreamV1Event = {
  /** The CloudEvent message containing all event properties. */
  message: {
    /** Identifies the event. */
    id: string;
    /** Describes the type of event related to the originating occurrence. */
    type: string;
    /** The event payload. */
    data?: {
      [additionalProperties: string]: any;
    } | null;
    /** Identifies the context in which an event happened. */
    source: string;
    /** The version of the CloudEvents specification which the event uses. */
    specversion: string;
    /** Timestamp of when the occurrence happened. Must adhere to RFC 3339. */
    time?: string | null;
    /** The Auth0 tenant identifier to which the event is associated. */
    a0tenant: string;
    /**
     * The Auth0 event stream ID of the stream the event was delivered on.
     * Present when the event is delivered via an event stream; omitted when
     * events are retrieved via the Events API (GET /api/v2/events).
     */
    a0stream?: string;
    /** The purpose of this event. Set only in special cases such as a test event; omitted for normal events. */
    a0purpose?: 'test' & string;
  };
};
interface Configuration {}
interface Secrets {
  [secretName: string]: string;
}
interface Event extends EventStreamV1Event {
  /**
   * @private Configuration values associated with this Action.
   */
  configuration: Configuration;
  /**
   * Secret values securely associated with this Action.
   */
  secrets: Secrets;
}
interface EventStreamAction {
  (event: Event, api: EventStreamAPI): Promise<void>;
}
export type { Configuration, Event, EventStreamAPI, EventStreamAction, Secrets };
