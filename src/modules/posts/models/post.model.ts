import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { PostTypes } from '../../../@types/posts';
import User from '../../users/models/user.model';
import Comment from '../../comments/models/comment.model';
import PostModelType = PostTypes.PostModelType;

@Table({
  tableName: 'posts',
  timestamps: true,
})
export default class Post extends Model<Partial<PostModelType>> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column(DataType.STRING)
  declare title: string;

  @HasMany(() => Comment)
  declare comments: Comment[];

  @BelongsTo(() => User)
  declare user: User;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  declare userId: number;
}
