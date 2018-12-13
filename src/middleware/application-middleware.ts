import { Context } from 'koa';

export const instrumentAndHandleErrors = async (ctx: Context, next: () => any) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = {
      message: error.message || 'Something went wrong',
      reason: error.reason ? error.reason.toString() : 'Unknown error',
    };

    if (ctx.status === 500) {
      console.error(error);
    }
  }
};

export async function handleStatusCheck(ctx: Context, next: () => any): Promise<void> {
  if (ctx.request.path === '/healthz') {
    ctx.status = 200;
    ctx.body = { message: "I'm so healthy..." };
    return;
  }

  return await next();
}

export async function resolveUnhandledActions(ctx: Context, next: () => any): Promise<void> {
  ctx.status = 204;
  return;
}
