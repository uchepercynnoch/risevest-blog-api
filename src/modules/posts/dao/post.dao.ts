import { PostTypes } from '../../../@types/posts';
import { IBaseDao } from '../../core/dao';
import Post from '../models/post.model';
import { Attributes, FindOptions } from 'sequelize';
import PostModelType = PostTypes.PostModelType;

export interface IPostDao extends IBaseDao<Post, PostModelType> {
  FIND_BY_TITLE(name: string, options?: FindOptions<Attributes<Post>>): Promise<Post | null>;
}
