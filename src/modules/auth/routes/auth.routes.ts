import { Request, Response } from 'express';
import AuthController from '../controllers/auth.controller';
import AuthService from '../services/auth.service';
import Settings from '../../../config/settings';
import UserService from '../../users/services/user.service';

const authService = new AuthService(new Settings());
const userService = new UserService();

const authController = new AuthController(authService, userService);

/**
 * @swagger
 * /api/v1/login:
 *  post:
 *   description: Login new User
 *   tags: [Auth]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/LoginUser'
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
export const loginUserRouteHandler = async (req: Request, res: Response) => {
  const response = await authController.login(req);

  res.status(response.code).json(response);
};
