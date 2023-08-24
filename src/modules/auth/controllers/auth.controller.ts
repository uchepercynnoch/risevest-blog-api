import AuthService from '../services/auth.service';
import { Request } from 'express';
import UserService from '../../users/services/user.service';
import HttpStatus from '../../core/helpers/http-status.helper';
import { LoginDto } from '../dto/auth.dto';
import CustomApiException from '../../core/exceptions/custom-api.exception';
import { CoreTypes } from '../../../@types/core';
import Joi from 'joi';
import { loginSchema } from '../validation/auth.schema';
import HttpResponseType = CoreTypes.HttpResponseType;

export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  public async login(req: Request): Promise<HttpResponseType<string>> {
    const { error, value } = Joi.object<LoginDto>(loginSchema()).validate(req.body);

    if (error)
      return Promise.reject(CustomApiException.response(error.details[0].message, HttpStatus.UNAUTHORIZED.code));

    const user = await this.userService.findById(value?.userId);

    if (!user)
      return Promise.reject(CustomApiException.response(HttpStatus.UNAUTHORIZED.value, HttpStatus.UNAUTHORIZED.code));

    return Promise.resolve({
      code: HttpStatus.OK.code,
      message: HttpStatus.OK.value,
      result: await this.authService.loginUser(user),
    });
  }
}
