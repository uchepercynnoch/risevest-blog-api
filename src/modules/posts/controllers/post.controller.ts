import PostService from '../services/post.service';
import { AddCommentDto, CreatePostDto } from '../dto/post.dto';
import { Request } from 'express';
import { CoreTypes } from '../../../@types/core';
import Post from '../models/post.model';
import CustomApiException from '../../core/exceptions/custom-api.exception';
import CommentsService from '../../comments/services/comments.service';
import Joi from 'joi';
import { addCommentSchema, createPostSchema } from '../validation/posts.schema';
import HttpStatus from '../../core/helpers/http-status.helper';
import Comment from '../../comments/models/comment.model';
import HttpResponseType = CoreTypes.HttpResponseType;

export default class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly commentsService: CommentsService,
  ) {}

  public async create(req: Request): Promise<HttpResponseType<Post>> {
    const { value, error } = Joi.object<CreatePostDto>(createPostSchema()).validate(req.body);

    if (error)
      return Promise.reject(CustomApiException.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

    const postExist = await this.postService.FIND_BY_TITLE(value.title);

    if (postExist)
      return Promise.reject(
        CustomApiException.response(`Post with title ${value.title} already exist`, HttpStatus.CONFLICT.code),
      );

    const post = await this.postService.CREATE(value);

    return Promise.resolve({
      code: HttpStatus.CREATED.code,
      message: HttpStatus.CREATED.value,
      timestamp: new Date().toDateString(),
      result: post,
    });
  }

  public async addComment(req: Request): Promise<HttpResponseType<Post>> {
    const { value, error } = Joi.object<AddCommentDto>(addCommentSchema()).validate(req.body);

    if (error)
      return Promise.reject(CustomApiException.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

    const postId = req.params.postId;

    const post = await this.postService.FIND_BY_ID(parseInt(postId));

    if (!post) return Promise.reject(CustomApiException.response(`Post not found`, HttpStatus.NOT_FOUND.code));

    const comment = await this.commentsService.CREATE({
      content: value.comment,
    });

    await post.$add('comments', [comment]);

    return Promise.resolve({
      code: HttpStatus.ACCEPTED.code,
      message: HttpStatus.ACCEPTED.value,
      timestamp: new Date().toDateString(),
      result: await this.postService.FIND_BY_ID(parseInt(postId), {
        include: [Comment],
        raw: false,
        plain: true,
      }),
    });
  }

  public async posts(): Promise<HttpResponseType<Post>> {
    return Promise.resolve({
      code: HttpStatus.OK.code,
      message: HttpStatus.OK.value,
      timestamp: new Date().toDateString(),
      results: await this.postService.FIND_ALL(),
    });
  }
}
