import axios from 'axios';
import { sign } from 'jsonwebtoken';
import prismaClient from '../prisma';

interface IAccessTokenResponse {
  access_token: string;
}

interface IGitHubUserResponse {
  id: number;
  name: string;
  login: string;
  avatar_url: string;
}

export default class AuthenticateUserService {
  async execute(code: string) {
    const url = 'https://github.com/login/oauth/access_token';

    const { data: accessTokenResponse } =
      await axios.post<IAccessTokenResponse>(url, null, {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code
        },
        headers: {
          Accept: 'application/json'
        }
      });

    const { data: gitHubUserResponse } = await axios.get<IGitHubUserResponse>(
      'https://api.github.com/user',
      {
        headers: {
          authorization: `Bearer ${accessTokenResponse.access_token}`
        }
      }
    );

    const { id, name, login, avatar_url } = gitHubUserResponse;

    let user = await prismaClient.user.findFirst({
      where: { github_id: id }
    });

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          github_id: id,
          name,
          login,
          avatar_url
        }
      });
    }

    const token = sign(
      {
        user: {
          id: user.id,
          name: user.name,
          avatar_url: user.avatar_url
        }
      },
      `${process.env.JWT_SECRET}`,
      {
        subject: user.id,
        expiresIn: '1d'
      }
    );

    return { user, token };
  }
}
