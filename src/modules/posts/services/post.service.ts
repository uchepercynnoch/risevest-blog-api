import { Attributes, FindAndCountOptions, FindOptions, Optional } from 'sequelize';
import { PostTypes } from '../../../@types/posts';
import { IPostDao } from '../dao/post.dao';
import Post from '../models/post.model';
import PostRepository from '../repositories/post.repository';

export default class PostService extends PostRepository implements IPostDao {
  async CREATE(value: Partial<PostTypes.PostModelType>, options?: Optional<unknown, never> | undefined): Promise<Post> {
    return this.save(value, options);
  }

  FIND_ONE(
    value: Partial<PostTypes.PostModelType>,
    options?: FindOptions<Partial<PostTypes.PostModelType>> | undefined,
  ): Promise<Post | null> {
    return this.findOne({
      where: {
        ...value,
      },
      ...options,
    });
  }

  FIND_BY_ID(id: number, options?: FindOptions<Partial<PostTypes.PostModelType>> | undefined): Promise<Post | null> {
    return this.findById(id, options);
  }

  FIND_ALL(options?: FindOptions<Partial<PostTypes.PostModelType>> | undefined): Promise<Post[]> {
    return this.findAll(options);
  }

  FIND_AND_COUNT_ALL(
    options?: FindAndCountOptions<Partial<PostTypes.PostModelType>> | undefined,
  ): Promise<{ rows: Post[]; count: number }> {
    return this.findAllAndCount(options);
  }

  FIND_BY_TITLE(title: string, options?: FindOptions<Attributes<Post>>): Promise<Post | null> {
    return this.findOne({
      where: {
        title,
      },
      ...options,
    });
  }
}
