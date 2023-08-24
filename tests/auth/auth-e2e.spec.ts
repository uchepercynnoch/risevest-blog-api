import http, { Server } from 'http';
import supertest, { SuperTest, Test } from 'supertest';

import 'dotenv/config';

import app from '../../src/app';
import { SQLDatabase } from '../../src/config/database/sql.database';
import { Sequelize } from 'sequelize-typescript';
import HttpStatus from '../../src/modules/core/helpers/http-status.helper';
import SeedUtil from '../../src/modules/core/utils/seed.util';

import { CoreTypes } from '../../src/@types/core';
import Settings from '../../src/config/settings';
import { verify } from 'jsonwebtoken';
import HttpResponseType = CoreTypes.HttpResponseType;
import EnvType = CoreTypes.EnvType;
import JwtConfigType = CoreTypes.JwtConfigType;
import IAppJwtPayload = CoreTypes.IAppJwtPayload;

let server: Server;
let api: SuperTest<Test>;
let sequelize: Sequelize;
let settings: Settings;

const apiRoot = '/api/v1';
const env = process.env.NODE_ENV as EnvType;

describe('AuthModule', () => {
  beforeAll(async () => {
    const sqlDatabase = new SQLDatabase();
    const PORT = 5001;

    sequelize = sqlDatabase.sequelize;

    await sequelize.sync({ logging: false });

    const seedUtil = new SeedUtil();

    await seedUtil.run();

    settings = new Settings();

    api = supertest(app);

    server = http.createServer(app);

    server.listen(PORT);
  });

  afterAll(async () => {
    await sequelize.sync({ force: true });
    await sequelize.close();

    server.close();
  });

  describe('Post /login', () => {
    it('should return an error given invalid user id', async () => {
      const response = await api.post(`${apiRoot}/login`).send({
        userId: null,
      });

      expect(response.body).toHaveProperty('code', HttpStatus.UNAUTHORIZED.code);
      expect(response.body).toHaveProperty('message', '"User Id" must be a number');
    });

    it('should return an error given unknown user id', async () => {
      const response = await api.post(`${apiRoot}/login`).send({
        userId: 0,
      });

      expect(response.body).toHaveProperty('code', HttpStatus.UNAUTHORIZED.code);
      expect(response.body).toHaveProperty('message', HttpStatus.UNAUTHORIZED.value);
    });

    it('should return success with login token given valid user id', async () => {
      const response = await api.post(`${apiRoot}/login`).send({
        userId: 1,
      });

      const body = response.body as HttpResponseType<string>;
      const jwt = settings.get('jwt', env) as JwtConfigType;

      expect(body).toHaveProperty('code', HttpStatus.OK.code);
      expect(body).toHaveProperty('message', HttpStatus.OK.value);
      expect(body).toHaveProperty('result');

      const payload = verify(body.result as string, jwt.secret) as IAppJwtPayload;

      expect(payload).toHaveProperty('id', 1);
    });
  });
});
