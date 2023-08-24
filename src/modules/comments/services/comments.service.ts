import { FindAndCountOptions, FindOptions, Optional } from 'sequelize';
import { CommentTypes } from '../../../@types/comments';
import { ICommentDao } from '../dao/comments.dao';
import Comment from '../models/comment.model';
import CommentRepository from '../repositories/comments.repository';

export default class CommentsService extends CommentRepository implements ICommentDao {
  async CREATE(
    value: Partial<CommentTypes.CommentModelType>,
    options?: Optional<unknown, never> | undefined,
  ): Promise<Comment> {
    return this.save(value, options);
  }

  FIND_ONE(
    value: Partial<CommentTypes.CommentModelType>,
    options?: FindOptions<Partial<CommentTypes.CommentModelType>> | undefined,
  ): Promise<Comment | null> {
    return this.findOne({
      where: {
        ...value,
      },
      ...options,
    });
  }

  FIND_BY_ID(
    id: number,
    options?: FindOptions<Partial<CommentTypes.CommentModelType>> | undefined,
  ): Promise<Comment | null> {
    return this.findById(id, options);
  }

  FIND_ALL(options?: FindOptions<Partial<CommentTypes.CommentModelType>> | undefined): Promise<Comment[]> {
    return this.findAll(options);
  }

  FIND_AND_COUNT_ALL(
    options?: FindAndCountOptions<Partial<CommentTypes.CommentModelType>> | undefined,
  ): Promise<{ rows: Comment[]; count: number }> {
    return this.findAllAndCount(options);
  }
}
