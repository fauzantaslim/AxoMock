import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import logger from './utils/logger.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`🦎 Axomock is alive on port ${PORT}`);
  logger.info(`  ➜ Local:   http://localhost:${PORT}`);
  logger.info(`  ➜ API:     http://localhost:${PORT}/api`);
  logger.info(`  ➜ Docs:    http://localhost:${PORT}/docs\n`);
});
