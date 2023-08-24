import UserService from '../services/user.service';
import { AddPostDto, CreateUserDto } from '../dto/user.dto';
import { Request } from 'express';
import { CoreTypes } from '../../../@types/core';
import User from '../models/user.model';
import CustomApiException from '../../core/exceptions/custom-api.exception';
import PostService from '../../posts/services/post.service';
import Post from '../../posts/models/post.model';
import Joi from 'joi';
import { addPostSchema, createUserSchema } from '../validation/users.schema';
import HttpStatus from '../../core/helpers/http-status.helper';
import HttpResponseType = CoreTypes.HttpResponseType;

export default class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  public async create(req: Request): Promise<HttpResponseType<User>> {
    const { error, value } = Joi.object<CreateUserDto>(createUserSchema()).validate(req.body);

    if (error)
      return Promise.reject(CustomApiException.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

    const userExist = await this.userService.FIND_BY_NAME(value?.name);

    if (userExist)
      return Promise.reject(
        CustomApiException.response(`User with name ${value?.name} already exist`, HttpStatus.CONFLICT.code),
      );

    const user = await this.userService.CREATE(value);

    return Promise.resolve({
      code: HttpStatus.CREATED.code,
      message: HttpStatus.CREATED.value,
      timestamp: new Date().toDateString(),
      result: user,
    });
  }

  public async addPost(req: Request): Promise<HttpResponseType<User>> {
    const { error, value } = Joi.object<AddPostDto>(addPostSchema()).validate(req.body);

    if (error)
      return Promise.reject(CustomApiException.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

    const userId = req.params.id;

    const user = await this.userService.FIND_BY_ID(parseInt(userId));

    if (!user) return Promise.reject(CustomApiException.response(`User not found`, HttpStatus.NOT_FOUND.code));

    let post = await this.postService.FIND_BY_TITLE(value.title);

    if (!post) {
      post = await this.postService.CREATE({
        title: value.title,
      });
    }

    await user.$add('posts', [post]);

    return Promise.resolve({
      code: HttpStatus.ACCEPTED.code,
      message: HttpStatus.ACCEPTED.value,
      timestamp: new Date().toDateString(),
      result: await this.userService.FIND_BY_ID(parseInt(userId), {
        include: [{ model: Post }],
        raw: false,
        plain: true,
      }),
    });
  }

  public async users(): Promise<HttpResponseType<User>> {
    return Promise.resolve({
      code: HttpStatus.OK.code,
      message: HttpStatus.OK.value,
      timestamp: new Date().toDateString(),
      results: await this.userService.FIND_ALL(),
    });
  }
}
