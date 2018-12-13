import * as crypto from 'crypto';
import {Context} from 'koa';

export async function checkGitHubSignature(ctx: Context, next: () => Promise<void>): Promise <void> {
  const signature: string = ctx.request.headers['x-hub-signature'];
  if (!signature) {
    ctx.status = 400;
    ctx.body = { message: 'Invalid signature' };
    return;
  }

  const expected: string = crypto
    .createHmac('sha1', process.env.GITHUB_WEBHOOK_SECRET)
    .update((ctx.request as any).rawBody)
    .digest('hex');

  if (signature !== `sha1=${expected}`) {
    ctx.status = 400;
    ctx.body = { message: 'Invalid signature' };
    return;
  }

  await next();
}

export async function abortEventsCausedByThisApp(ctx: Context, next: () => any): Promise<void> {
  if (ctx.request.body.sender && ctx.request.body.sender.login === process.env.GITHUB_APP_NAME) {
    ctx.status = 200;
    ctx.body = { message: 'I don\'t respond to my own events.' };

    return;
  }

  await next();
}

export async function delayEventHandling(ctx: Context, next: () => any): Promise<void> {
  if (!process.env.EVENT_HANDLING_DELAY) {
    await next();
    return;
  }

  return new Promise<void>((resolve, reject) => {
    setTimeout(async () => {
      try {
        await next();
      } catch (err) {
        reject(err);
      }
      resolve();
    }, parseInt(process.env.EVENT_HANDLING_DELAY));
  });
}
