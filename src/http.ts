import {IncomingMessage} from 'http';
import { Log } from 'koa';
import * as request from 'request';

export interface IRequestResolution {
  body: any;
  response: IncomingMessage;
}

export interface ILogOptions {
  log: Log;
}

export type RequestOptions = request.Options & ILogOptions;

export default async function(opts: RequestOptions): Promise<IRequestResolution> {
  return new Promise<IRequestResolution>((resolve, reject) => {
    request(opts, (err, response, body) => {
      if (err) { return reject(err); }

      return resolve({ response, body });
    });
  });
}
