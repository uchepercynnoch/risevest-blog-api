import { Request, Response } from 'express';

import PostController from '../controllers/post.controller';
import PostService from '../services/post.service';
import CommentsService from '../../comments/services/comments.service';

const postController = new PostController(new PostService(), new CommentsService());

/**
 * @swagger
 * /api/v1/posts:
 *  post:
 *   description: Create new Post
 *   tags: [Posts]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/CreatePost'
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
export const createPostRouteHandler = async (req: Request, res: Response) => {
  const response = await postController.create(req);

  res.status(response.code).json(response);
};

/**
 * @swagger
 * /api/v1/posts/{postId}/comments:
 *  put:
 *   parameters:
 *    - in: path
 *      name: postId
 *      schema:
 *        type: integer
 *      required: true
 *      description: Create Post Comment
 *   tags: [Posts]
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
export const createPostCommentRouteHandler = async (req: Request, res: Response) => {
  const response = await postController.addComment(req);

  res.status(response.code).json(response);
};

/**
 * @swagger
 * /api/v1/posts:
 *  get:
 *   description: Fetch all Posts
 *   tags: [Posts]
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
export const getPostsRouteHandler = async (_: Request, res: Response) => {
  const response = await postController.posts();

  res.status(response.code).json(response);
};
