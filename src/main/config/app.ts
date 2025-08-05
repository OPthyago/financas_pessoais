import express, { Express } from 'express';
import cors from 'cors';

export const setupApp = async (): Promise<Express> => {
  const app = express();

  app.use(cors<cors.CorsRequest>());
  app.use(express.json());

  app.get('/health', (_req, res) => res.status(200).json({ status: 'ok' }));

  return app;
}

