import UserService from '../services/user.service';
import { AddPostDto, CreateUserDto } from '../dto/user.dto';
import { Request } from 'express';
import { CoreTypes } from '../../../@types/core';
import User from '../models/user.model';
import CustomApiException from '../../core/exceptions/custom-api.exception';
import PostService from '../../posts/services/post.service';
import Post from '../../posts/models/post.model';
import HttpResponseType = CoreTypes.HttpResponseType;

export default class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  public async create(req: Request): Promise<HttpResponseType<User>> {
    const createUserDto = req.body as CreateUserDto;

    const userExist = await this.userService.FIND_BY_NAME(createUserDto.name);

    if (userExist)
      return Promise.reject(CustomApiException.response(`User with name ${createUserDto.name} already exist`, 400));

    const user = await this.userService.CREATE(createUserDto);

    return Promise.resolve({
      code: 201,
      message: 'Created',
      timestamp: new Date().toDateString(),
      result: user,
    });
  }

  public async addPost(req: Request): Promise<HttpResponseType<User>> {
    const userId = req.params.userId;
    const addPostDto = req.body as AddPostDto;

    const user = await this.userService.FIND_BY_ID(parseInt(userId), {
      include: [{ model: Post }],
    });

    if (!user) return Promise.reject(CustomApiException.response(`User not found`, 404));

    let post = await this.postService.FIND_BY_TITLE(addPostDto.title);

    if (!post) {
      post = await this.postService.CREATE({
        title: addPostDto.title,
      });
    }

    await user.$add('posts', post);

    return Promise.resolve({
      code: 201,
      message: 'Created',
      timestamp: new Date().toDateString(),
      result: user,
    });
  }

  public async users(): Promise<HttpResponseType<User>> {
    return Promise.resolve({
      code: 200,
      message: 'Ok',
      timestamp: new Date().toDateString(),
      results: await this.userService.FIND_ALL(),
    });
  }
}
