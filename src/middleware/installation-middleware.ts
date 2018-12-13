import { Context } from 'koa';

import { getInstallationAccessToken } from '../helpers/authentication-helper';
import { Installation } from '../db/installation';

export async function getInstallationToken(ctx: Context, next: () => any): Promise<void> {
  const log = ctx.log;
  ctx.state.installationToken = await getInstallationAccessToken(ctx.state.installation, log);

  return await next();
}

export async function loadInstallation(ctx: Context, next: () => any): Promise<void> {
  ctx.state.installation = await Installation.findOne({
    installationId: ctx.request.body.installation.id,
  });

  if (ctx.state.installation) {
    return await next();
  }
  ctx.status = 404;
  ctx.body = { message: 'Installation not found.' };
}

export async function handleCreated(ctx: Context, next: () => any): Promise<void> {
  const action = ctx.request.body.action;
  if (ctx.request.headers['x-github-event'] !== 'installation' || action !== 'created') {
    return await next();
  }

  await Installation.create({
    githubAccountId: ctx.request.body.installation.account.id,
    installationId: ctx.request.body.installation.id,
  });

  ctx.status = 201;
  ctx.body = { message: 'Created successfully!' };
}

export async function handleDeleted(ctx: Context, next: () => any): Promise<void> {
  const action = ctx.request.body.action;
  if (ctx.request.headers['x-github-event'] !== 'installation' || action !== 'deleted') {
    return await next();
  }
  const installation = ctx.request.body.installation;
  const removed = await Installation.removeOne({
    installationId: installation.id,
  });

  if (removed) {
    ctx.status = 204;
  }
}
