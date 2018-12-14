import chalk from 'chalk';
import {createConnection} from "typeorm";
// import {User} from "./entity/User";

export const connectToDB = async () => {
  try {
    const connection = await createConnection();
    console.log(chalk.grey(`'${connection.name}' connection to DB established`));
    return connection;
  } catch (error) {
    console.error(error);
  }
}
