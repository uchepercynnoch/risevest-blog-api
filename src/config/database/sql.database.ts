import { Sequelize } from 'sequelize-typescript';

import { CoreTypes } from '../../@types/core';
import Settings from '../settings';
import sqlModels from './sql.models';
import LoggerUtil from '../../modules/core/utils/logger.util';
import SQLDBConfigType = CoreTypes.SQLDBConfigType;
import EnvType = CoreTypes.EnvType;

export class SQLDatabase {
  private static logger = LoggerUtil.init(SQLDatabase.name).logger;

  private static _sequelize: Sequelize;

  public static get sequelize(): Sequelize {
    if (!this._sequelize) {
      this._sequelize = this.connect();

      return this._sequelize;
    }

    return this._sequelize;
  }

  public get sequelize(): Sequelize {
    return SQLDatabase.sequelize;
  }

  public static init() {
    const sqlDatabase = new SQLDatabase();

    this._sequelize = this.connect();

    return sqlDatabase;
  }

  private static getSettings() {
    const env = process.env.NODE_ENV as EnvType;
    const settings = new Settings();

    return settings.get('postgres', env) as SQLDBConfigType;
  }

  private static connect() {
    const settings = this.getSettings();

    return new Sequelize({
      host: settings.host,
      username: settings.username,
      password: settings.password,
      port: settings.port,
      database: settings.database,
      dialect: settings.dialect,
      models: sqlModels,
      define: {
        paranoid: true,
        freezeTableName: true,
      },
      logging: (sql) => this.logger.debug(sql),
    });
  }
}
