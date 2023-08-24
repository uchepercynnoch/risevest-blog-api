import { faker } from '@faker-js/faker';
import User from '../../modules/users/models/user.model';
import { Attributes } from 'sequelize';
import Post from '../../modules/posts/models/post.model';
import Comment from '../../modules/comments/models/comment.model';
import { SuperTest, Test } from 'supertest';
import { CoreTypes } from '../../@types/core';
import HttpResponseType = CoreTypes.HttpResponseType;

export const createFakeUsersFactory = (count = 1) => {
  const users: Attributes<User>[] = [];

  for (let i = 0; i < count; i++) {
    users[i] = {
      name: faker.person.fullName(),
    };
  }

  return users;
};

export const createFakePostsFactory = (count = 1) => {
  const posts: Attributes<Post>[] = [];

  for (let i = 0; i < count; i++) {
    posts[i] = {
      title: faker.lorem.words(5),
    };
  }

  return posts;
};

export const createFakeCommentsFactory = (count = 1) => {
  const posts: Attributes<Comment>[] = [];

  for (let i = 0; i < count; i++) {
    posts[i] = {
      content: faker.lorem.paragraph(),
    };
  }

  return posts;
};

export const fakePostRequest = <T, V>(body: Partial<V>, url: string) => {
  url = `/api/v1/${url}`;

  return async (api: SuperTest<Test>, jwt?: string): Promise<HttpResponseType<T>> => {
    if (jwt) {
      const response = await api.post(url).set('Authorization', `Bearer ${jwt}`).send(body);

      return response.body;
    }

    const response = await api.post(url).send(body);

    return response.body;
  };
};

export const fakeGetRequest = <T>(url: string) => {
  url = `/api/v1/${url}`;

  return async (api: SuperTest<Test>, jwt?: string): Promise<HttpResponseType<T>> => {
    if (jwt) {
      const response = await api.get(url).set('Authorization', `Bearer ${jwt}`);

      return response.body;
    }

    const response = await api.get(url);

    return response.body;
  };
};

export const fakePutRequest = <T, V>(body: Partial<V>, url: string) => {
  url = `/api/v1/${url}`;

  return async (api: SuperTest<Test>, jwt?: string): Promise<HttpResponseType<T>> => {
    if (jwt) {
      const response = await api.put(url).set('Authorization', `Bearer ${jwt}`).send(body);

      return response.body;
    }

    const response = await api.put(url).send(body);

    return response.body;
  };
};
