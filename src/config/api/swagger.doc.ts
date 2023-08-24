import routeApis from './route.apis';
import swaggerJsdoc from 'swagger-jsdoc';

export default {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API',
      version: '1.0.0',
      description: 'RiseVest Blog REST API',
    },
    host: 'localhost:5000',
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          in: 'header',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [...routeApis, './src/resources/api/swagger_defs/*.yml'],
} as swaggerJsdoc.Options;
