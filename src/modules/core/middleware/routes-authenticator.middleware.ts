import { NextFunction, Request, Response } from 'express';
import LoggerUtil from '../utils/logger.util';
import { CoreTypes } from '../../../@types/core';
import Settings from '../../../config/settings';
import CustomApiException from '../exceptions/custom-api.exception';
import HttpStatus from '../helpers/http-status.helper';
import { verify } from 'jsonwebtoken';
import * as util from 'util';
import AsyncWrapperType = CoreTypes.AsyncWrapperType;
import EnvType = CoreTypes.EnvType;
import JwtConfigType = CoreTypes.JwtConfigType;

export default class RoutesAuthenticatorMiddleware {
  private static logger = LoggerUtil.init(RoutesAuthenticatorMiddleware.name).logger;

  public static authenticate(handler: AsyncWrapperType) {
    const settings = new Settings();

    return async (req: Request, res: Response, next: NextFunction) => {
      const env = process.env.NODE_ENV as EnvType;

      const jwtConfig = settings.get('jwt', env) as JwtConfigType;
      const headers = req.headers;
      const jwtSecret = jwtConfig.secret;

      if (!headers?.authorization) {
        this.logger.error(`Authorization not in header`);

        return next(CustomApiException.response(HttpStatus.UNAUTHORIZED.value, HttpStatus.UNAUTHORIZED.code));
      }

      const authorization = headers.authorization;

      if (!authorization.includes('Bearer')) {
        this.logger.error(`Bearer not in JWT token`);

        return next(CustomApiException.response(HttpStatus.UNAUTHORIZED.value, HttpStatus.UNAUTHORIZED.code));
      }

      const jwt = authorization.split(' ')[1].trim();

      try {
        verify(jwt, jwtSecret);

        await handler(req, res, next);
      } catch (e) {
        this.logger.error(util.inspect(e));

        return next(CustomApiException.response(HttpStatus.UNAUTHORIZED.value, HttpStatus.UNAUTHORIZED.code));
      }
    };
  }
}
