import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';

import { CommentTypes } from '../../../@types/comments';
import Post from '../../posts/models/post.model';
import CommentModelType = CommentTypes.CommentModelType;

@Table({
  tableName: 'comments',
  timestamps: true,
})
export default class Comment extends Model<Partial<CommentModelType>> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column(DataType.STRING)
  declare content: string;

  @BelongsTo(() => Post)
  declare post: Post;

  @ForeignKey(() => Post)
  @Column(DataType.INTEGER)
  declare postId: number;
}
