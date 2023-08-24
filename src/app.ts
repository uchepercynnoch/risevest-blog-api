import swaggerJsdoc from 'swagger-jsdoc';
import swaggerDoc from './config/api/swagger.doc';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { serve, setup } from 'swagger-ui-express';
import routes from './config/api/routes';
import GlobalExceptionHandlerMiddleware from './modules/core/middleware/global-exception-handler.middleware';

const app = express();

const openapiSpecification = swaggerJsdoc(swaggerDoc);

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use(`/docs`, serve, setup(openapiSpecification));
app.use('/api/v1', routes);
app.use(GlobalExceptionHandlerMiddleware.handle);

export default app;
