import pino from 'pino';

const usePretty = process.env.PRETTY === '1';

const logger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  base: { service: 'axomock' },
  // Censor sensitive data automatically
  redact: {
    paths: ['password', 'card', 'token', '*.password', '*.card', '*.token', 'req.headers.authorization'],
    censor: '[Redacted]',
  },
  // Use pino-pretty in development if PRETTY=1 is set
  ...(usePretty
    ? {
        transport: {
          target: 'pino-pretty',
          options: { translateTime: 'SYS:HH:MM:ss', ignore: 'pid,hostname' },
        },
      }
    : {}),
});

export default logger;
