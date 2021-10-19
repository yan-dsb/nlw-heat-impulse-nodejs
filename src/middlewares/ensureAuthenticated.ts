import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      status: 'error',
      message: 'JWT token is missing'
    });
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, `${process.env.JWT_SECRET}`) as IPayload;
    request.user_id = sub;

    return next();
  } catch (error) {
    return response.status(401).json({
      status: 'error',
      message: 'Invalid JWT token'
    });
  }
}
