import CommentsService from '../services/comments.service';
import { CoreTypes } from '../../../@types/core';
import Comment from '../models/comment.model';
import HttpResponseType = CoreTypes.HttpResponseType;

export default class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  public async comments(): Promise<HttpResponseType<Comment>> {
    return Promise.resolve({
      code: 200,
      message: 'Ok',
      timestamp: new Date().toDateString(),
      results: await this.commentService.FIND_ALL(),
    });
  }
}
