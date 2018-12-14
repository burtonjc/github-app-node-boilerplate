import { Pool, QueryResult } from 'pg';

export * from './installation';
export * from './installation-access-token';

const pool = new Pool()

export interface QueryOpts {
  text: string,
  values: any[]
}

export interface QueryExpression<T> {
  select?: Array<keyof T>;
  conditions?: Partial<{
    [K in keyof T]: [string, T[K]]
  }>,
}

interface TypedQueryResult<T> extends QueryResult {
  rows: T[];
}

export const query = <T> ({ text, values }: QueryOpts) => {
  return new Promise<TypedQueryResult<T>>((resolve, reject) => {
    pool.query(text, values, (error, result) => {
      if (error) {
        return reject(error);
      }

      resolve(result);
    });
  });
}
