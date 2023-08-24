import Settings from '../../../config/settings';
import { CoreTypes } from '../../../@types/core';
import { sign } from 'jsonwebtoken';
import User from '../../users/models/user.model';
import EnvType = CoreTypes.EnvType;
import JwtConfigType = CoreTypes.JwtConfigType;
import IAppJwtPayload = CoreTypes.IAppJwtPayload;

export default class AuthService {
  constructor(private readonly settings: Settings) {}

  public async loginUser(user: User) {
    const env = process.env.NODE_ENV as EnvType;

    const configType = this.settings.get('jwt', env) as JwtConfigType;

    const payload: IAppJwtPayload = {
      id: user.id,
    };

    return sign(payload, configType.secret, { expiresIn: configType.expiry });
  }
}
