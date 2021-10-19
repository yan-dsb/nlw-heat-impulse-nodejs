import express, { Request, Response } from 'express';
import 'dotenv/config';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import router from './routes';

const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

io.on('connection', socket => {
  console.log(`User connected ${socket.id}`);
});

app.use(cors());
app.use(express.json());
app.use(router);

app.get('/github', (request: Request, response: Response) => {
  return response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

app.get('/signin/callback', (request: Request, response: Response) => {
  const { code } = request.query;

  return response.json(code);
});

export { server, io };
