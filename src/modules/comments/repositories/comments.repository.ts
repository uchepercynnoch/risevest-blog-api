import BaseRepository from '../../core/repositories/base.repository';
import Comment from '../models/comment.model';

export default class CommentRepository extends BaseRepository<Comment, number> {
  constructor() {
    super(Comment);
  }
}
