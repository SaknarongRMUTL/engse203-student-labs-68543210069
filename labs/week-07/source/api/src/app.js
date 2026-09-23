import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import requestRoutes from './routes/requestRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import morgan from 'morgan';
export function createApp() {
  const app = express();
  app.use(cors({ origin: config.corsOrigin }));
  app.use(express.json());
  app.use(morgan(config.isProduction ? 'combined' : 'dev'));
  app.get('/', (req, res) => {
    res.json({ message: 'Campus Service API is running', version: '2.0.0' });
  });
  app.use('/api/requests', requestRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
