import PostService from '../services/post.service';
import { AddCommentDto, CreatePostDto } from '../dto/post.dto';
import { Request } from 'express';
import { CoreTypes } from '../../../@types/core';
import Post from '../models/post.model';
import CustomApiException from '../../core/exceptions/custom-api.exception';
import CommentsService from '../../comments/services/comments.service';
import Comment from '../../comments/models/comment.model';
import HttpResponseType = CoreTypes.HttpResponseType;

export default class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly commentsService: CommentsService,
  ) {}

  public async create(req: Request): Promise<HttpResponseType<Post>> {
    const createPostDto = req.body as CreatePostDto;

    const postExist = await this.postService.FIND_BY_TITLE(createPostDto.title);

    if (postExist)
      return Promise.reject(CustomApiException.response(`Post with title ${createPostDto.title} already exist`, 400));

    const post = await this.postService.CREATE(createPostDto);

    return Promise.resolve({
      code: 201,
      message: 'Created',
      timestamp: new Date().toDateString(),
      result: post,
    });
  }

  public async addComment(req: Request): Promise<HttpResponseType<Post>> {
    const postId = req.params.postId;
    const addPostDto = req.body as AddCommentDto;

    const post = await this.postService.FIND_BY_ID(parseInt(postId), {
      include: [{ model: Comment }],
    });

    if (!post) return Promise.reject(CustomApiException.response(`Post not found`, 404));

    const comment = await this.commentsService.CREATE({
      content: addPostDto.comment,
    });

    await post.$add('comments', comment);

    return Promise.resolve({
      code: 201,
      message: 'Created',
      timestamp: new Date().toDateString(),
      result: post,
    });
  }

  public async posts(): Promise<HttpResponseType<Post>> {
    return Promise.resolve({
      code: 200,
      message: 'Ok',
      timestamp: new Date().toDateString(),
      results: await this.postService.FIND_ALL(),
    });
  }
}
