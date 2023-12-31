import UserController from '../controllers/user.controller';
import UserService from '../services/user.service';
import PostService from '../../posts/services/post.service';
import RoutesAuthenticatorMiddleware from '../../core/middleware/routes-authenticator.middleware';

const userController = new UserController(new UserService(), new PostService());

/**
 * @swagger
 * /api/v1/users:
 *  post:
 *   description: Create new User
 *   tags: [Users]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/CreateUser'
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
export const createUserRouteHandler = RoutesAuthenticatorMiddleware.authenticate(async (req, res) => {
  const response = await userController.create(req);

  res.status(response.code).json(response);
});

/**
 * @swagger
 * /api/v1/users/{id}/posts:
 *  put:
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: integer
 *      required: true
 *      description: Create User Post
 *   tags: [Users]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/AddPost'
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
export const createUserPostRouteHandler = RoutesAuthenticatorMiddleware.authenticate(async (req, res) => {
  const response = await userController.addPost(req);

  res.status(response.code).json(response);
});

/**
 * @swagger
 * /api/v1/users:
 *  get:
 *   description: Fetch all Users
 *   tags: [Users]
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
export const getUsersRouteHandler = RoutesAuthenticatorMiddleware.authenticate(async (_, res) => {
  const response = await userController.users();

  res.status(response.code).json(response);
});
