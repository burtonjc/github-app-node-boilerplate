import { Context } from 'koa';
import { getRepository } from 'typeorm';

import { getInstallationAccessToken } from '../helpers/authentication-helper';
import { Installation, InstallationAccessToken } from '../db/entities';

export async function getInstallationToken(ctx: Context, next: () => any): Promise<void> {
  const log = ctx.log;
  ctx.state.installationToken = await getInstallationAccessToken(ctx.state.installation, log);

  return await next();
}

export async function loadInstallation(ctx: Context, next: () => any): Promise<void> {
  const installation = await getRepository(Installation)
    .createQueryBuilder('i')
    .where('i.installationId = :installationId', { installationId: ctx.request.body.installation.id })
    .getOne();

  if (installation) {
    ctx.state.installation = installation;
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

  const result = await getRepository(Installation)
    .createQueryBuilder()
    .insert()
    .into(Installation)
    .values([{
      githubAccountId: ctx.request.body.installation.account.id,
      installationId: ctx.request.body.installation.id,
    }])
    .execute();

  ctx.status = 201;
  ctx.body = { message: 'Created successfully!' };
}

export async function handleDeleted(ctx: Context, next: () => any): Promise<void> {
  const action = ctx.request.body.action;
  if (ctx.request.headers['x-github-event'] !== 'installation' || action !== 'deleted') {
    return await next();
  }
  const appInstallation = ctx.request.body.installation;
  const installation = await getRepository(Installation)
    .createQueryBuilder('i')
    .where('i.installationId = :installationId', { installationId: ctx.request.body.installation.id })
    .getOne();

  const removedTokens = await getRepository(InstallationAccessToken)
    .createQueryBuilder()
    .delete()
    .from(InstallationAccessToken)
    .where('installation = :installation', { installation: installation.id })
    .execute();
  const removedInstallations = await getRepository(Installation)
    .createQueryBuilder()
    .delete()
    .from(Installation)
    .where('installationId = :installationId', { installationId: appInstallation.id })
    .execute();

  ctx.status = 204;
}
