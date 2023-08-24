import { Attributes, FindAndCountOptions, FindOptions, Optional } from 'sequelize';
import { UserTypes } from '../../../@types/users';
import { IUserDao } from '../dao/user.dao';
import User from '../models/user.model';
import UserRepository from '../repositories/user.repository';

export default class UserService extends UserRepository implements IUserDao {
  CREATE(value: Partial<UserTypes.UserModelType>, options?: Optional<unknown, never> | undefined): Promise<User> {
    return this.save(value, options);
  }

  FIND_ONE(
    value: Partial<UserTypes.UserModelType>,
    options?: FindOptions<Partial<UserTypes.UserModelType>> | undefined,
  ): Promise<User | null> {
    return this.findOne({
      where: {
        ...value,
      },
      ...options,
    });
  }

  FIND_BY_ID(id: number, options?: FindOptions<Partial<UserTypes.UserModelType>> | undefined): Promise<User | null> {
    return this.findById(id, options);
  }

  FIND_ALL(options?: FindOptions<Partial<UserTypes.UserModelType>> | undefined): Promise<User[]> {
    return this.findAll(options);
  }

  FIND_AND_COUNT_ALL(
    options?: FindAndCountOptions<Partial<UserTypes.UserModelType>> | undefined,
  ): Promise<{ rows: User[]; count: number }> {
    return this.findAllAndCount(options);
  }

  FIND_BY_NAME(name: string, options?: FindOptions<Attributes<User>>): Promise<User | null> {
    return this.findOne({
      where: { name },
      ...options,
    });
  }
}
