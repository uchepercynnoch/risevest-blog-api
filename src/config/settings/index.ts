import { Dialect } from 'sequelize';
import { CoreTypes } from '../../@types/core';
import EnvType = CoreTypes.EnvType;
import SettingsConfigType = CoreTypes.SettingsConfigType;

export default class Settings {
  private settings: SettingsConfigType;

  constructor() {
    this.settings = {
      postgres: {
        development: {
          database: process.env.DEV_DB_DATABASE as string,
          dialect: process.env.DEV_DB_DIALECT as Dialect,
          host: process.env.DEV_DB_HOST as string,
          password: process.env.DEV_DB_PASSWORD as string,
          port: parseInt(process.env.DEV_DB_PORT as string),
          username: process.env.DEV_DB_USER as string,
        },
        test: {
          database: process.env.TEST_DB_DATABASE as string,
          dialect: process.env.TEST_DB_DIALECT as Dialect,
          host: process.env.TEST_DB_HOST as string,
          password: process.env.TEST_DB_PASSWORD as string,
          port: parseInt(process.env.TEST_DB_PORT as string),
          username: process.env.TEST_DB_USER as string,
        },
      },
      redis: {
        development: {
          database: parseInt(process.env.DEV_REDIS_DATABASE as string),
          host: process.env.DEV_DB_HOST as string,
          port: parseInt(process.env.DEV_REDIS_PORT as string),
        },
        test: {
          database: parseInt(process.env.TEST_REDIS_DATABASE as string),
          host: process.env.TEST_DB_HOST as string,
          port: parseInt(process.env.TEST_REDIS_PORT as string),
        },
      },
    };
  }

  public static async init() {
    return new Settings();
  }

  public get<Config extends keyof SettingsConfigType>(config: Config, env: EnvType) {
    return this.settings[config][env];
  }
}
