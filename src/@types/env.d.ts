declare namespace NodeJS {
  import { CoreTypes } from './core';
  import EnvType = CoreTypes.EnvType;

  interface ProcessEnv {
    NODE_ENV?: EnvType;
    PORT?: string;

    DEV_DB_HOST?: string;
    DEV_DB_USER?: string;
    DEV_DB_PASSWORD?: string;
    DEV_DB_DATABASE?: string;
    DEV_DB_PORT?: string;
    DEV_DB_DIALECT?: string;

    TEST_DB_HOST?: string;
    TEST_DB_USER?: string;
    TEST_DB_PASSWORD?: string;
    TEST_DB_DATABASE?: string;
    TEST_DB_PORT?: string;
    TEST_DB_DIALECT?: string;

    DEV_REDIS_HOST?: string;
    DEV_REDIS_USER?: string;
    DEV_REDIS_PASSWORD?: string;
    DEV_REDIS_DATABASE?: string;
    DEV_REDIS_PORT?: string;

    TEST_REDIS_HOST?: string;
    TEST_REDIS_USER?: string;
    TEST_REDIS_PASSWORD?: string;
    TEST_REDIS_DATABASE?: string;
    TEST_REDIS_PORT?: string;

    DEV_JWT_SECRET?: string;
    DEV_JWT_EXPIRY?: string;

    TEST_JWT_SECRET?: string;
    TEST_JWT_EXPIRY?: string;
  }
}
