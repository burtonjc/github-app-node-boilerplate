import { query, QueryExpression } from './index';

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

  static async findOne(expression: QueryExpression<InstallationAccessTokenColumns>) {
    const text = [
      'SELECT',
      expression.select ? expression.select.join(', ') : '*',
      'FROM installation_access_tokens',
    ]

    const values = [];
    if (expression.conditions) {
      const conditions = Object.keys(expression.conditions).reduce((acc, k: keyof InstallationAccessTokenColumns) => {
        const [ operator, value ] = expression.conditions[k];
        values.push(value);
        return acc.concat([
          k,
          operator,
          `$${values.length}`
        ].join(' '));
      }, []);

      text.push(`WHERE ${conditions.join(' AND ')}`);
    }

    console.log(`${text.join(' ')};`);
    const result = await query<InstallationAccessTokenColumns>({
      // text: 'SELECT FROM installation_access_tokens(installation) VALUES($1) WHERE expiresAt > $2::date LIMIT 1',
      text: `${text.join(' ')};`,
      values: values,
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
