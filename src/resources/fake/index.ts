import { faker } from '@faker-js/faker';
import User from '../../modules/users/models/user.model';
import { Attributes } from 'sequelize';
import Post from '../../modules/posts/models/post.model';
import Comment from '../../modules/comments/models/comment.model';

export const createFakeUsersFactory = (count = 1): Attributes<User> | Attributes<User>[] => {
  if (count === 1) {
    return {
      id: count,
      name: faker.person.fullName(),
    };
  }

  const users: Attributes<User>[] = [];

  for (let i = 0; i < count; i++) {
    users[i] = {
      id: i + 1,
      name: faker.person.fullName(),
    };
  }

  return users;
};

export const createFakePostsFactory = (count = 1): Attributes<Post> | Attributes<Post>[] => {
  if (count === 1) {
    return {
      id: count,
      title: faker.lorem.words(5),
    };
  }

  const posts: Attributes<Post>[] = [];

  for (let i = 0; i < count; i++) {
    posts[i] = {
      id: i + 1,
      title: faker.lorem.words(5),
    };
  }

  return posts;
};

export const createFakeCommentsFactory = (count = 1): Attributes<Comment> | Attributes<Comment>[] => {
  if (count === 1) {
    return {
      id: count,
      content: faker.lorem.paragraph(),
    };
  }

  const posts: Attributes<Comment>[] = [];

  for (let i = 0; i < count; i++) {
    posts[i] = {
      id: i + 1,
      content: faker.lorem.paragraph(),
    };
  }

  return posts;
};
