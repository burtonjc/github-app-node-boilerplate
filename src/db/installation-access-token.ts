import { query } from './index';

interface InstallationAccessTokenColumns {
  expiresAt: Date;
  installation: string;
  token: string;
}

export class InstallationAccessToken {
  constructor(
    public expiresAt: Date,
    public installation: string,
    public token: string,
  ) { }

  static async create(accessToken: InstallationAccessTokenColumns) {
    const result = await query<InstallationAccessTokenColumns>({
      text: 'INSERT INTO installation_access_tokens(expiresAt, installation, token) VALUES($1, $2)',
      values: [ accessToken.expiresAt, accessToken.installation, accessToken.token ],
    });

    return new InstallationAccessToken(
      result.rows[0].expiresAt,
      result.rows[0].installation,
      result.rows[0].token,
    );
  }

  static async findOne({ expiresAt, installation }: { expiresAt: Date, installation: string }) {
    const result = await query<InstallationAccessTokenColumns>({
      text: 'SELECT FROM installation_access_tokens(installation) VALUES($1) WHERE expiresAt > $2::date LIMIT 1',
      values: [ installation, expiresAt ],
    });

    return new InstallationAccessToken(
      result.rows[0].expiresAt,
      result.rows[0].installation,
      result.rows[0].token,
    );
  }

  static async remove({ expiresAt }: { expiresAt: Date }) {
    return await true;
  }
}
