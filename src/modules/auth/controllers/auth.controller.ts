import AuthService from '../services/auth.service';
import { Request } from 'express';
import UserService from '../../users/services/user.service';
import HttpStatus from '../../core/helpers/http-status.helper';
import { LoginDto } from '../dto/auth.dto';
import CustomApiException from '../../core/exceptions/custom-api.exception';
import { CoreTypes } from '../../../@types/core';
import HttpResponseType = CoreTypes.HttpResponseType;

export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  public async login(req: Request): Promise<HttpResponseType<string>> {
    const { userId = 1 } = req.body as LoginDto; //always login super admin

    const user = await this.userService.findById(userId);

    if (!user)
      return Promise.reject(CustomApiException.response(HttpStatus.UNAUTHORIZED.value, HttpStatus.UNAUTHORIZED.code));

    return Promise.resolve({
      code: HttpStatus.OK.code,
      message: HttpStatus.OK.value,
      result: await this.authService.loginUser(user),
    });
  }
}
