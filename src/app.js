import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import Youch from 'youch';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import cors from 'cors';
import routes from './routes';
import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(this.requestLogger);
  }

  requestLogger(req, res, next) {
    console.log(
      `${format(new Date(), 'dd/MM/yyyy - HH:mm:ssxxx', { locale: pt })} - ${
        req.method
      } - ${req.url}`
    );
    next();
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      console.log(err);
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }

      return res.status(500).json({ message: 'Internal server error' });
    });
  }
}

export default new App().server;
