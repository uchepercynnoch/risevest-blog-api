import BaseRepository from '../../core/repositories/base.repository';
import User from '../models/user.model';

export default class UserRepository extends BaseRepository<User, number> {
  constructor() {
    super(User);
  }
}
