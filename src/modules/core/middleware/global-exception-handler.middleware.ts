import { NextFunction, Request, Response } from 'express';
import LoggerUtil from '../utils/logger.util';
import { CoreTypes } from '../../../@types/core';
import CustomApiException from '../exceptions/custom-api.exception';
import * as util from 'util';
import HttpResponseType = CoreTypes.HttpResponseType;

export default class GlobalExceptionHandlerMiddleware {
  public static handle(err: Error, _: Request, res: Response, next: NextFunction) {
    const logger = LoggerUtil.init(GlobalExceptionHandlerMiddleware.name).logger;

    if (res.headersSent) return next(err);

    const response: HttpResponseType<null> = {
      code: 500,
      message: 'An error occurred. Contact support',
      timestamp: new Date().toDateString(),
    };

    if (err instanceof CustomApiException) {
      response.code = err.code;
      response.message = err.message;

      return res.status(err.code).json(response);
    }

    process.on('uncaughtException', (error) => {
      if (process.env.NODE_ENV !== 'test') logger.error(util.inspect(error));

      response.message = error.message;
      return res.status(response.code).json(response);
    });

    process.on('unhandledRejection', (reason) => {
      if (process.env.NODE_ENV !== 'test') logger.error(util.inspect(reason));

      response.message = reason as string;

      return res.status(response.code).json(response);
    });

    if (process.env.NODE_ENV !== 'test') logger.error(util.inspect(err));

    return res.status(response.code).json(response);
  }
}
