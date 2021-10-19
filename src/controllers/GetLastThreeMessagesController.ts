import { Request, Response } from 'express';
import GetLastThreeMessagesService from '../services/GetLastThreeMessagesService';

export default class GetLastThreeMessagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getLastThreeMessages = new GetLastThreeMessagesService();

    const result = await getLastThreeMessages.execute();

    return response.json(result);
  }
}
