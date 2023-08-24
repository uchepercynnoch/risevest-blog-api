import 'dotenv/config';

import { SQLDatabase } from '../../src/config/database/sql.database';
import SeedUtil from '../../src/modules/core/utils/seed.util';
import supertest, { SuperTest, Test } from 'supertest';
import app from '../../src/app';
import http, { Server } from 'http';
import { Sequelize } from 'sequelize-typescript';
import {
  createFakeCommentsFactory,
  createFakePostsFactory,
  fakeGetRequest,
  fakePostRequest,
  fakePutRequest,
} from '../../src/resources/fake';
import HttpStatus from '../../src/modules/core/helpers/http-status.helper';
import Post from '../../src/modules/posts/models/post.model';
import { AddCommentDto, CreatePostDto } from '../../src/modules/posts/dto/post.dto';
import { LoginDto } from '../../src/modules/auth/dto/auth.dto';
import { Attributes } from 'sequelize';

let server: Server;
let api: SuperTest<Test>;
let sequelize: Sequelize;
let fakePosts: Attributes<Post>[];

describe('PostsModule', () => {
  beforeAll(async () => {
    const sqlDatabase = new SQLDatabase();
    const PORT = 5001;

    sequelize = sqlDatabase.sequelize;

    await sequelize.sync({ logging: false });

    const seedUtil = new SeedUtil();

    await seedUtil.run();
    fakePosts = seedUtil.fakePosts;

    api = supertest(app);

    server = http.createServer(app);

    server.listen(PORT);
  });

  afterAll(async () => {
    await sequelize.sync({ force: true });
    await sequelize.close();

    server.close();
  });

  describe('POST /posts', () => {
    const fakePost = createFakePostsFactory();

    it('should return an error given no JWT', async () => {
      const response = await fakePostRequest<Post, CreatePostDto>(fakePost[0], 'posts')(api);

      expect(response).toHaveProperty('code', HttpStatus.UNAUTHORIZED.code);
      expect(response).toHaveProperty('message', HttpStatus.UNAUTHORIZED.value);
    });

    it('should return an error given invalid creation data and valid JWT', async () => {
      const loginResponse = await fakePostRequest<string, LoginDto>({ userId: 1 }, 'login')(api);

      const jwt = loginResponse.result as string;

      const response = await fakePostRequest<Post, CreatePostDto>(
        {
          title: '',
        },
        'posts',
      )(api, jwt);

      expect(response).toHaveProperty('code', HttpStatus.BAD_REQUEST.code);
      expect(response).toHaveProperty('message', '"Title" is not allowed to be empty');
    });

    it('should return an error given duplicate post title data and valid JWT', async () => {
      const loginResponse = await fakePostRequest<string, LoginDto>({ userId: 1 }, 'login')(api);

      const jwt = loginResponse.result as string;

      const response = await fakePostRequest<Post, CreatePostDto>(
        {
          title: fakePosts[0].title,
        },
        'posts',
      )(api, jwt);

      expect(response).toHaveProperty('code', HttpStatus.CONFLICT.code);
      expect(response).toHaveProperty('message', `Post with title ${fakePosts[0].title} already exist`);
    });

    it('should return success with post object given valid creation data and JWT', async () => {
      const loginResponse = await fakePostRequest<string, LoginDto>({ userId: 1 }, 'login')(api);

      const jwt = loginResponse.result as string;

      const response = await fakePostRequest<Post, CreatePostDto>(fakePost[0], 'posts')(api, jwt);

      expect(response).toHaveProperty('code', HttpStatus.CREATED.code);
      expect(response).toHaveProperty('message', HttpStatus.CREATED.value);
      expect(response).toHaveProperty(
        'result',
        expect.objectContaining({
          title: fakePost[0].title,
        }),
      );
    });
  });

  describe('PUT /posts/{postId}/comments', () => {
    const fakeAddComment = createFakeCommentsFactory();
    const url = `posts/1/comments`;

    it('should return an error given no JWT', async () => {
      const response = await fakePutRequest<Post, AddCommentDto>(
        {
          comment: fakeAddComment[0].content,
        },
        url,
      )(api);

      expect(response).toHaveProperty('code', HttpStatus.UNAUTHORIZED.code);
      expect(response).toHaveProperty('message', HttpStatus.UNAUTHORIZED.value);
    });

    it('should return an error given invalid creation data and valid JWT', async () => {
      const loginResponse = await fakePostRequest<string, LoginDto>({ userId: 1 }, 'login')(api);

      const jwt = loginResponse.result as string;

      const response = await fakePutRequest<Post, AddCommentDto>(
        {
          comment: '',
        },
        url,
      )(api, jwt);

      expect(response).toHaveProperty('code', HttpStatus.BAD_REQUEST.code);
      expect(response).toHaveProperty('message', '"Comment" is not allowed to be empty');
    });

    it('should return an error given valid creation data and valid JWT but unknown post id', async () => {
      const loginResponse = await fakePostRequest<string, LoginDto>({ userId: 1 }, 'login')(api);

      const jwt = loginResponse.result as string;
      const url = `posts/100/comments`;

      const response = await fakePutRequest<Post, AddCommentDto>(
        {
          comment: fakeAddComment[0].content,
        },
        url,
      )(api, jwt);

      expect(response).toHaveProperty('code', HttpStatus.NOT_FOUND.code);
      expect(response).toHaveProperty('message', 'Post not found');
    });

    it('should return success given valid creation data, JWT, and post id', async () => {
      const loginResponse = await fakePostRequest<string, LoginDto>({ userId: 1 }, 'login')(api);

      const jwt = loginResponse.result as string;

      const response = await fakePutRequest<Post, AddCommentDto>(
        {
          comment: fakeAddComment[0].content,
        },
        url,
      )(api, jwt);

      expect(response).toHaveProperty('code', HttpStatus.ACCEPTED.code);
      expect(response).toHaveProperty('message', HttpStatus.ACCEPTED.value);
      expect(response).toHaveProperty(
        'result',
        expect.objectContaining({
          id: 1,
          title: fakePosts[0].title,
        }),
      );
      expect(response.result?.comments).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            postId: 1,
            content: fakeAddComment[0].content,
          }),
        ]),
      );
    });
  });

  describe('GET /posts', () => {
    it('should return an error given no JWT', async () => {
      const response = await fakeGetRequest<Post>('posts')(api);

      expect(response).toHaveProperty('code', HttpStatus.UNAUTHORIZED.code);
      expect(response).toHaveProperty('message', HttpStatus.UNAUTHORIZED.value);
    });

    it('should return success with array of posts given valid JWT', async () => {
      const loginResponse = await fakePostRequest<string, LoginDto>({ userId: 1 }, 'login')(api);

      const jwt = loginResponse.result as string;

      const response = await fakeGetRequest<Post>('posts')(api, jwt);

      expect(response).toHaveProperty('code', HttpStatus.OK.code);
      expect(response).toHaveProperty('message', HttpStatus.OK.value);

      expect(response?.results?.length).toEqual(6);

      expect(response).toHaveProperty(
        'results',
        expect.arrayContaining([
          expect.objectContaining({
            id: 1,
            title: fakePosts[0].title,
          }),
        ]),
      );
    });
  });
});
