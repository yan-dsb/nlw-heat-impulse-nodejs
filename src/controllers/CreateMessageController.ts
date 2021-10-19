import { Request, Response } from 'express';
import CreateMessageService from '../services/CreateMessageService';

export default class CreateMessageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { message } = request.body;
    const { user_id } = request;
    const createMessage = new CreateMessageService();

    const result = await createMessage.execute({ text: message, user_id });

    return response.json(result);
  }
}
