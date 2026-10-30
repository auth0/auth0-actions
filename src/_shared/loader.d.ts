interface Handler {
  (...args: any[]): Promise<void>;
}
interface Execution {
  /** Returns all stdout/stderr output written by the action via console. */
  getLogs(): string;
}
/** An actions: module to register up front, so the action can require('actions:<name>'). */
interface ModuleRegistration {
  name: string;
  filename: string;
  secrets?: Record<string, string>;
}
interface LoadedAction<TModule extends Record<string, Handler>> {
  /** Invokes the loaded action's export named `entrypoint`, e.g. `action.execute('onExecutePostLogin', event, api)`. */
  execute<K extends keyof TModule & string>(
    entrypoint: K,
    ...args: Parameters<TModule[K]>
  ): Promise<Execution>;
}
export type { LoadedAction as L, ModuleRegistration as M };
