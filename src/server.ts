import chalk from 'chalk';

import { buildApp } from './app';

process.env.PORT = process.env.PORT || '4321';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

buildApp().listen(process.env.PORT, () => {
  console.log(chalk.grey(`App running at http://localhost:${process.env.PORT}/`))
});
