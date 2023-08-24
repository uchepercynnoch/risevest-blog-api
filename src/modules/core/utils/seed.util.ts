import { createFakeCommentsFactory, createFakePostsFactory, createFakeUsersFactory } from '../../../resources/fake';
import User from '../../users/models/user.model';
import { Attributes } from 'sequelize';
import Post from '../../posts/models/post.model';
import Comment from '../../comments/models/comment.model';
import UserRepository from '../../users/repositories/user.repository';
import PostRepository from '../../posts/repositories/post.repository';
import CommentRepository from '../../comments/repositories/comments.repository';

export default class SeedUtil {
  private userRepository: UserRepository;
  private postRepository: PostRepository;
  private commentRepository: CommentRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.postRepository = new PostRepository();
    this.commentRepository = new CommentRepository();
  }

  private declare _fakeUsers: Attributes<User>[];

  get fakeUsers(): Attributes<User>[] {
    return this._fakeUsers;
  }

  private declare _fakePosts: Attributes<Post>[];

  get fakePosts(): Attributes<Post>[] {
    return this._fakePosts;
  }

  private declare _fakeComments: Attributes<Comment>[];

  get fakeComments(): Attributes<Comment>[] {
    return this._fakeComments;
  }

  public async run() {
    await this.loadFakeUsers();
    await this.loadFakePosts();
    await this.loadFakeComments();
  }

  private async loadFakeUsers() {
    this._fakeUsers = createFakeUsersFactory(5);

    await this.userRepository.bulkCreate(this._fakeUsers);
  }

  private async loadFakePosts() {
    this._fakePosts = createFakePostsFactory(5);

    await this.postRepository.bulkCreate(this._fakePosts);
  }

  private async loadFakeComments() {
    this._fakeComments = createFakeCommentsFactory(5);

    await this.commentRepository.bulkCreate(this._fakeComments);
  }
}
