import cors from 'cors';
import express from 'express';
import { createContainer } from './container.js';
import { createV1Router } from './api/v1/index.js';
import { errorHandler } from './middleware/errorHandler.js';

export function createApp() {
  const app = express();
  const container = createContainer();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use(createV1Router(container));

  app.use(errorHandler);

  return { app, container };
}
