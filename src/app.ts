import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';

import {
  ApplicationMiddleware,
  GitHubMiddleware,
  InstallationMiddleware,
} from './middleware';

export function buildApp(): Koa {
  const app = new Koa();

  app
    .use(ApplicationMiddleware.instrumentAndHandleErrors)
    .use(ApplicationMiddleware.handleStatusCheck)
    .use(bodyParser())
    .use(GitHubMiddleware.abortEventsCausedByThisApp)
    .use(GitHubMiddleware.checkGitHubSignature)
    .use(GitHubMiddleware.delayEventHandling)

    .use(InstallationMiddleware.handleCreated)
    .use(InstallationMiddleware.handleDeleted)

    .use(InstallationMiddleware.loadInstallation)
    .use(InstallationMiddleware.getInstallationToken)

    .use(ApplicationMiddleware.resolveUnhandledActions);

  return app;
}
