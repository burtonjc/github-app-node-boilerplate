import * as Koa from "koa";

declare module "koa" {
  export interface Log {
    debug: (...args: any[]) => void;
    error: (...args: any[]) => void;
    fatal: (...args: any[]) => void;
    info: (...args: any[]) => void;
    trace: (...args: any[]) => void;
    warn: (...args: any[]) => void;
  }
  export interface Context {
    log: Log;
  }
}
