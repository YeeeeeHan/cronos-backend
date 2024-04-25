import dotenv from 'dotenv';
import express, { Express } from 'express';
import expressListRoutes from 'express-list-routes';
import { config } from './config/config';
import { pingDB } from './controllers/ping';
import { parserMiddlewares } from './middlewares/defaultMiddleware';
import {
  NotFoundMiddleWare,
  errorMiddleware,
} from './middlewares/errorMiddleware';
import { swagger } from './middlewares/swaggerMiddleware';
import { routes } from './routes/routes';
import { log } from './utils/logger';

dotenv.config();

export const app: Express = express();
export const port = process.env.PORT || 4000;

log.info(`[index.ts]: Running on "${config.ENV}" environment`);
log.info(`[index.ts]: Running on "${config.CHAIN}" chain`);
log.info(`[index.ts]: Server is running at http://localhost:${port}`);

// 0. Ping DB to check connection
pingDB();

// 1. Body Parsing Middleware
parserMiddlewares(app);

// 2. Router Middleware
routes(app);

// 3. Swagger Middleware
swagger(app);

// 4. Error Handling Middleware
errorMiddleware(app);

// 5. 404 Middleware
NotFoundMiddleWare(app);

// 6. List all routes
expressListRoutes(app, { prefix: '' });

app.listen(port, () => {});
