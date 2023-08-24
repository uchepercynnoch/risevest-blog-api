import 'dotenv/config';

import { SQLDatabase } from '../../src/config/database/sql.database';
import SeedUtil from '../../src/modules/core/utils/seed.util';
import supertest, { SuperTest, Test } from 'supertest';
import app from '../../src/app';
import http, { Server } from 'http';
import { Sequelize } from 'sequelize-typescript';
import {
  createFakePostsFactory,
  createFakeUsersFactory,
  fakeGetRequest,
  fakePostRequest,
  fakePutRequest,
} from '../../src/resources/fake';
import HttpStatus from '../../src/modules/core/helpers/http-status.helper';
import User from '../../src/modules/users/models/user.model';
import { AddPostDto, CreateUserDto } from '../../src/modules/users/dto/user.dto';
import { LoginDto } from '../../src/modules/auth/dto/auth.dto';
import { Attributes } from 'sequelize';

let server: Server;
let api: SuperTest<Test>;
let sequelize: Sequelize;
let fakeUsers: Attributes<User>[];

describe('UsersModule', () => {
  beforeAll(async () => {
    const sqlDatabase = new SQLDatabase();
    const PORT = 5001;

    sequelize = sqlDatabase.sequelize;

    await sequelize.sync({ logging: false });

    const seedUtil = new SeedUtil();

    await seedUtil.run();
    fakeUsers = seedUtil.fakeUsers;

    api = supertest(app);

    server = http.createServer(app);

    server.listen(PORT);
  });

  afterAll(async () => {
    await sequelize.sync({ force: true });
    await sequelize.close();

    server.close();
  });

  describe('POST /users', () => {
    const fakeUser = createFakeUsersFactory();

    it('should return an error given no JWT', async () => {
      const response = await fakePostRequest<User, CreateUserDto>(fakeUser[0], 'users')(api);

      expect(response).toHaveProperty('code', HttpStatus.UNAUTHORIZED.code);
      expect(response).toHaveProperty('message', HttpStatus.UNAUTHORIZED.value);
    });

    it('should return an error given invalid creation data and valid JWT', async () => {
      const loginResponse = await fakePostRequest<string, LoginDto>({ userId: 1 }, 'login')(api);

      const jwt = loginResponse.result as string;

      const response = await fakePostRequest<User, CreateUserDto>(
        {
          name: '',
        },
        'users',
      )(api, jwt);

      expect(response).toHaveProperty('code', HttpStatus.BAD_REQUEST.code);
      expect(response).toHaveProperty('message', '"Name" is not allowed to be empty');
    });

    it('should return an error given duplicate user title data and valid JWT', async () => {
      const loginResponse = await fakePostRequest<string, LoginDto>({ userId: 1 }, 'login')(api);

      const jwt = loginResponse.result as string;

      const response = await fakePostRequest<User, CreateUserDto>(
        {
          name: fakeUsers[0].name,
        },
        'users',
      )(api, jwt);

      expect(response).toHaveProperty('code', HttpStatus.CONFLICT.code);
      expect(response).toHaveProperty('message', `User with name ${fakeUsers[0].name} already exist`);
    });

    it('should return success with user object given valid creation data and JWT', async () => {
      const loginResponse = await fakePostRequest<string, LoginDto>({ userId: 1 }, 'login')(api);

      const jwt = loginResponse.result as string;

      const response = await fakePostRequest<User, CreateUserDto>(fakeUser[0], 'users')(api, jwt);

      expect(response).toHaveProperty('code', HttpStatus.CREATED.code);
      expect(response).toHaveProperty('message', HttpStatus.CREATED.value);
      expect(response).toHaveProperty(
        'result',
        expect.objectContaining({
          name: fakeUser[0].name,
        }),
      );
    });
  });

  describe('PUT /users/{id}/posts', () => {
    const fakeAddPost = createFakePostsFactory();
    const url = `users/1/posts`;

    it('should return an error given no JWT', async () => {
      const response = await fakePutRequest<User, AddPostDto>(
        {
          title: fakeAddPost[0].title,
        },
        url,
      )(api);

      expect(response).toHaveProperty('code', HttpStatus.UNAUTHORIZED.code);
      expect(response).toHaveProperty('message', HttpStatus.UNAUTHORIZED.value);
    });

    it('should return an error given invalid creation data and valid JWT', async () => {
      const loginResponse = await fakePostRequest<string, LoginDto>({ userId: 1 }, 'login')(api);

      const jwt = loginResponse.result as string;

      const response = await fakePutRequest<User, AddPostDto>(
        {
          title: '',
        },
        url,
      )(api, jwt);

      expect(response).toHaveProperty('code', HttpStatus.BAD_REQUEST.code);
      expect(response).toHaveProperty('message', '"Title" is not allowed to be empty');
    });

    it('should return an error given valid creation data and valid JWT but unknown user id', async () => {
      const loginResponse = await fakePostRequest<string, LoginDto>({ userId: 1 }, 'login')(api);

      const jwt = loginResponse.result as string;
      const url = `users/100/posts`;

      const response = await fakePutRequest<User, AddPostDto>(
        {
          title: fakeAddPost[0].title,
        },
        url,
      )(api, jwt);

      expect(response).toHaveProperty('code', HttpStatus.NOT_FOUND.code);
      expect(response).toHaveProperty('message', 'User not found');
    });

    it('should return success given valid creation data, JWT, and user id', async () => {
      const loginResponse = await fakePostRequest<string, LoginDto>({ userId: 1 }, 'login')(api);

      const jwt = loginResponse.result as string;

      const response = await fakePutRequest<User, AddPostDto>(
        {
          title: fakeAddPost[0].title,
        },
        url,
      )(api, jwt);

      expect(response).toHaveProperty('code', HttpStatus.ACCEPTED.code);
      expect(response).toHaveProperty('message', HttpStatus.ACCEPTED.value);
      expect(response).toHaveProperty(
        'result',
        expect.objectContaining({
          id: 1,
          name: fakeUsers[0].name,
        }),
      );
      expect(response.result?.posts).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            userId: 1,
            title: fakeAddPost[0].title,
          }),
        ]),
      );
    });
  });

  describe('GET /users', () => {
    it('should return an error given no JWT', async () => {
      const response = await fakeGetRequest<User>('users')(api);

      expect(response).toHaveProperty('code', HttpStatus.UNAUTHORIZED.code);
      expect(response).toHaveProperty('message', HttpStatus.UNAUTHORIZED.value);
    });

    it('should return success with array of users given valid JWT', async () => {
      const loginResponse = await fakePostRequest<string, LoginDto>({ userId: 1 }, 'login')(api);

      const jwt = loginResponse.result as string;

      const response = await fakeGetRequest<User>('users')(api, jwt);

      expect(response).toHaveProperty('code', HttpStatus.OK.code);
      expect(response).toHaveProperty('message', HttpStatus.OK.value);

      expect(response?.results?.length).toEqual(6);

      expect(response).toHaveProperty(
        'results',
        expect.arrayContaining([
          expect.objectContaining({
            id: 1,
            name: fakeUsers[0].name,
          }),
        ]),
      );
    });
  });
});
