import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';

import { UserTypes } from '../../../@types/users';
import Post from '../../posts/models/post.model';
import UserModelType = UserTypes.UserModelType;

@Table({
  tableName: 'users',
  timestamps: true,
})
export default class User extends Model<Partial<UserModelType>> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column(DataType.STRING)
  declare name: string;

  @HasMany(() => Post)
  declare posts: Post[];
}
