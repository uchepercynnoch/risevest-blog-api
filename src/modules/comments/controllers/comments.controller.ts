import CommentsService from '../services/comments.service';
import { CoreTypes } from '../../../@types/core';
import Comment from '../models/comment.model';
import HttpStatus from '../../core/helpers/http-status.helper';
import HttpResponseType = CoreTypes.HttpResponseType;

export default class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  public async comments(): Promise<HttpResponseType<Comment>> {
    return Promise.resolve({
      code: HttpStatus.OK.code,
      message: HttpStatus.OK.value,
      timestamp: new Date().toDateString(),
      results: await this.commentService.FIND_ALL(),
    });
  }
}
