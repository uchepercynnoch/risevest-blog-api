import { Request, Response } from 'express';

import CommentsController from '../controllers/comments.controller';
import CommentsService from '../services/comments.service';

const commentsController = new CommentsController(new CommentsService());

/**
 * @swagger
 * /api/v1/comments:
 *  get:
 *   description: Fetch all Comments
 *   tags: [Comments]
 *   responses:
 *    200:
 *     description: OK
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/SuccessResponse'
 *    400:
 *     description: Bad requests
 *     content:
 *      application/json:
 *       schema:
 *         $ref: '#/definitions/ErrorResponse'
 *    404:
 *     description: Not Found
 *     content:
 *       application/json:
 *        schema:
 *          $ref: '#/definitions/ErrorResponse'
 *    500:
 *     description: Internal Server Error
 *     content:
 *       application/json:
 *        schema:
 *          $ref: '#/definitions/ErrorResponse'
 */
export const getCommentsRouteHandler = async (_: Request, res: Response) => {
  const response = await commentsController.comments();

  res.status(response.code).json(response);
};
