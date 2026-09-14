import 'dotenv/config';
import { env } from './src/config/env.js';
import { createApp } from './src/index.js';

const { app, container } = createApp();

const server = app.listen(env.port, () => {
  console.log(`API running at http://localhost:${env.port}`);
});

async function shutdown() {
  server.close();
  await container.prisma.$disconnect();
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
