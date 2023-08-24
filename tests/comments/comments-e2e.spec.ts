import http, { Server } from 'http';
import supertest, { SuperTest, Test } from 'supertest';

import 'dotenv/config';

import app from '../../src/app';
import { SQLDatabase } from '../../src/config/database/sql.database';
import { Sequelize } from 'sequelize-typescript';
import SeedUtil from '../../src/modules/core/utils/seed.util';
import HttpStatus from '../../src/modules/core/helpers/http-status.helper';
import { fakeGetRequest, fakePostRequest } from '../../src/resources/fake';
import Comment from '../../src/modules/comments/models/comment.model';
import { LoginDto } from '../../src/modules/auth/dto/auth.dto';

let server: Server;
let api: SuperTest<Test>;
let sequelize: Sequelize;

describe('CommentsModule', () => {
  beforeAll(async () => {
    const sqlDatabase = new SQLDatabase();
    const PORT = 5001;

    sequelize = sqlDatabase.sequelize;

    await sequelize.sync({ logging: false });

    const seedUtil = new SeedUtil();

    await seedUtil.run();

    api = supertest(app);

    server = http.createServer(app);

    server.listen(PORT);
  });

  afterAll(async () => {
    await sequelize.sync({ force: true });
    await sequelize.close();

    server.close();
  });

  describe('GET /comments', () => {
    it('should return an error given no JWT', async () => {
      const response = await fakeGetRequest<Comment>('comments')(api);

      expect(response).toHaveProperty('code', HttpStatus.UNAUTHORIZED.code);
      expect(response).toHaveProperty('message', HttpStatus.UNAUTHORIZED.value);
    });

    it('should return success with comments array given valid JWT', async () => {
      const loginResponse = await fakePostRequest<string, LoginDto>({ userId: 1 }, 'login')(api);

      const jwt = loginResponse.result as string;

      const response = await fakeGetRequest<Comment>('comments')(api, jwt);

      expect(response).toHaveProperty('code', HttpStatus.OK.code);
      expect(response).toHaveProperty('message', HttpStatus.OK.value);
      expect(response?.results?.length).toEqual(5);
    });
  });
});
