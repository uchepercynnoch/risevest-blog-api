import http from 'http';
import { SQLDatabase } from '../../../config/database/sql.database';
import Settings from '../../../config/settings';
import AppLoggerUtil from '../utils/app-logger.util';
import * as util from 'util';
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerDoc from '../../../config/api/swagger.doc';
import morgan from 'morgan';
import cors from 'cors';
import { serve, setup } from 'swagger-ui-express';
import GlobalExceptionHandlerMiddleware from '../middleware/global-exception-handler.middleware';
import routes from '../../../config/api/routes';

export default async function start() {
  const logger = AppLoggerUtil.init(start.name).logger;

  try {
    const PORT = process.env.PORT ?? 5050;

    await Settings.init();

    const sqlDB = SQLDatabase.init();

    await sqlDB.sequelize.sync({ force: true });

    const app = express();
    const server = http.createServer(app);

    const openapiSpecification = swaggerJsdoc(swaggerDoc);

    app.use(morgan('dev'));
    app.use(cors());

    app.use(`/docs`, serve, setup(openapiSpecification));
    app.use('/api/v1', routes);
    app.use(GlobalExceptionHandlerMiddleware.handle);

    server.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
  } catch (e: unknown) {
    logger.error(util.inspect(e));
  }
}
