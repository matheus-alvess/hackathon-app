import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

export default routes;
