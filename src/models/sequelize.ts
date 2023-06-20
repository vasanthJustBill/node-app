import { Sequelize } from 'sequelize';
import { app } from 'electron';
import path from 'path';

const dbPath = path.join(app.getPath('userData'), 'test.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
});

export default sequelize;
