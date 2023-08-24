import { NextFunction, Request, Response } from 'express';
import AppLoggerUtil from '../utils/app-logger.util';
import { CoreTypes } from '../../../@types/core';
import CustomApiException from '../exceptions/custom-api.exception';
import HttpResponseType = CoreTypes.HttpResponseType;

export default class GlobalExceptionHandlerMiddleware {
  private static logger = AppLoggerUtil.init(GlobalExceptionHandlerMiddleware.name).logger;

  public static handle(err: Error, _: Request, res: Response, next: NextFunction) {
    if (res.headersSent) return next(err);

    const response: HttpResponseType<null> = {
      code: 500,
      message: 'An error occurred.Contact support',
      timestamp: new Date().toDateString(),
    };

    if (err instanceof CustomApiException) {
      this.logger.error(err.message);
      this.logger.error(err.stack);

      response.code = err.code;
      response.message = err.message;

      return res.status(err.code).json(response);
    }

    process.on('uncaughtException', (error) => {
      this.logger.error(error.message);
      this.logger.error(error.stack);

      response.message = error.message;
      return res.status(response.code).json(response);
    });

    process.on('unhandledRejection', (reason) => {
      this.logger.error(reason);

      response.message = reason as string;

      return res.status(response.code).json(response);
    });

    this.logger.error(err.message);
    this.logger.error(err.stack);

    return res.status(response.code).json(response);
  }
}
