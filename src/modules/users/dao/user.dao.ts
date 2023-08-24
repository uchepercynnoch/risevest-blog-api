import { UserTypes } from '../../../@types/users';
import { IBaseDao } from '../../core/dao';
import User from '../models/user.model';
import { Attributes, FindOptions } from 'sequelize';
import UserModelType = UserTypes.UserModelType;

export interface IUserDao extends IBaseDao<User, UserModelType> {
  FIND_BY_NAME(name: string, options?: FindOptions<Attributes<User>>): Promise<User | null>;
}
