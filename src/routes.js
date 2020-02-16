import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import DisplayController from './app/controllers/DisplayController';
import authMiddleware from './app/middlewares/auth';
import accessControl from './app/middlewares/accessControl';
import CompanyController from './app/controllers/CompanyController';

const routes = new Router();

routes.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

/* free routes */
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

/* middleware authentication token */
routes.use(authMiddleware);

/* workers routes */

/* owners routes */
routes.use(accessControl);

routes.post('/owners/create/company', CompanyController.store);
routes.get('/owners/display/all', DisplayController.index);

export default routes;
