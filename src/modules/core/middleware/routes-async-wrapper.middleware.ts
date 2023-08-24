import { NextFunction, Request, Response } from 'express';
import { CoreTypes } from '../../../@types/core';
import AsyncWrapperType = CoreTypes.AsyncWrapperType;

export default class RoutesAsyncWrapperMiddleware {
  public static wrap(handler: AsyncWrapperType): any {
    return async function (req: Request, res: Response, next: NextFunction) {
      try {
        await handler(req, res, next);
      } catch (e) {
        next(e);
      }
    };
  }
}
