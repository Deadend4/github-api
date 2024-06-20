import { clientHost, clientPort } from './dotenv.config.js';

const allowedOrigins = [`${clientHost}:${clientPort}`];
export const corsOptions = {
  origin: allowedOrigins,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionSuccessStatus: 200,
};
