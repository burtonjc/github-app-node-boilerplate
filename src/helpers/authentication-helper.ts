import * as jwt from 'jsonwebtoken';
import { Log } from 'koa';
import * as moment from 'moment';
import { getRepository } from 'typeorm';

import http from '../http';
import { Installation, InstallationAccessToken } from '../db/entities';

export async function getInstallationAccessToken(installation: Installation, log: Log): Promise<InstallationAccessToken> {
  const [ accessToken ] = await Promise.all([
    getRepository(InstallationAccessToken)
      .createQueryBuilder('iat')
      .where('iat.installation = :installation', { installation: installation.installationId })
      .where('iat.expiresAt > :date', { date: moment().add(5, 'seconds').toDate() })
      .getOne(),
    getRepository(InstallationAccessToken)
      .createQueryBuilder()
      .delete()
      .from(InstallationAccessToken)
      .where('expiresAt < :date', { date: moment().add(5, 'seconds').toDate() })
      .execute()
  ]);

  if (accessToken) { return accessToken; }

  const integrationToken = await authenticateAsIntegration();

  const {response, body} = await http({
    headers: {
      "Accept": 'application/vnd.github.machine-man-preview+json',
      "Authorization": `Bearer ${integrationToken}`,
      'User-Agent': 'Auto Work Tracking Integration',
    },
    json: true,
    log,
    method: 'POST',
    url: `https://api.github.com/app/installations/${installation.installationId}/access_tokens`,
  });

  if (response.statusCode !== 201) { throw new Error('Failed to create token'); }

  const result = await getRepository(InstallationAccessToken)
    .createQueryBuilder()
    .insert()
    .into(InstallationAccessToken)
    .values([{
      expiresAt: new Date(body.expires_at),
      installation: installation.id,
      token: body.token,
    }])
    .execute();

  return result.raw;
}

function authenticateAsIntegration(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    jwt.sign({
      exp: Math.floor(Date.now() / 1000) + 60,
      iat: Math.floor(Date.now() / 1000) - 30,
      iss: process.env.GITHUB_APP_ID,
    },
    process.env.GITHUB_APP_PRIVATE_KEY,
    { algorithm: 'RS256' },
    (err, token) => {
      if (err) { return reject(err); }
      resolve(token);
    });
  });
}

