import 'dotenv/config';
import App from './app';
import AuthRoute from './routes/auth.route';
import IndexRoute from './routes/index.route';
import UsersRoute from './routes/users.route';
import { logger } from './utils/logger';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute()]);

app.listen();

process.on('unhandledRejection', (reason, p) => {
  logger.error('🔴 Unhandled Rejection at: Promise ', p, reason);
  process.exit(1);
});
