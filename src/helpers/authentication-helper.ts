import * as jwt from 'jsonwebtoken';
import { Log } from 'koa';
import * as moment from 'moment';

import http from '../http';
import { Installation, InstallationAccessToken } from '../db';

const pem: string = process.env.INTEGRATION_PRIVATE_KEY;

export async function getInstallationAccessToken(installation: Installation, log: Log): Promise<InstallationAccessToken> {
  const [accessToken] = await Promise.all([
    InstallationAccessToken.findOne({
      conditions: {
        expiresAt: ['>', moment().add(5, 'seconds').toDate()],
        installation: ['=', installation.installationId],
      },
    }),
    InstallationAccessToken.remove({
      expiresAt: moment().add(5, 'seconds').toDate(),
    }),
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

  const newToken = await InstallationAccessToken.create({
    expiresAt: new Date(body.expires_at),
    installation: installation.installationId,
    token: body.token,
  });

  return newToken;
}

function authenticateAsIntegration(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    jwt.sign({
      exp: Math.floor(Date.now() / 1000) + 60,
      iat: Math.floor(Date.now() / 1000) - 30,
      iss: process.env.GITHUB_APP_ID,
    }, pem, { algorithm: 'RS256' }, (err, token) => {
      if (err) { return reject(err); }
      resolve(token);
    });
  });
}

