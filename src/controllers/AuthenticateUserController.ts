import { Request, Response } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

export default class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { code } = request.body;

    const authenticateUser = new AuthenticateUserService();
    try {
      const result = await authenticateUser.execute(code);
      return response.json(result);
    } catch (error) {
      return response
        .status(401)
        .json({ status: 'error', message: 'Invalid code' });
    }
  }
}
