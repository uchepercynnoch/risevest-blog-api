import BaseRepository from '../../core/repositories/base.repository';
import Post from '../models/post.model';

export default class PostRepository extends BaseRepository<Post, number> {
  constructor() {
    super(Post);
  }
}
