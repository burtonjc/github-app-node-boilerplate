import { query } from './index';

interface InstallationColumns {
  githubAccountId: string,
  installationId: string,
}

export class Installation {
  constructor(
    public githubAccountId: string,
    public installationId: string,
  ) { }

  static async create(installation: InstallationColumns) {
    const result = await query<InstallationColumns>({
      text: 'INSERT INTO installations(githubAccountId, installationId) VALUES($1, $2)',
      values: [ installation.githubAccountId, installation.installationId ],
    });

    return new Installation(
      result.rows[0].githubAccountId,
      result.rows[0].installationId
    );
  }

  static async findOne({ installationId }: { installationId: string }) {
    return await null;
  }

  static async removeOne({ installationId }: { installationId: string }) {
    return await true;
  }
}
