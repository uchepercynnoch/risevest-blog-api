import routeApis from './route.apis';

export default {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API',
      version: '1.0.0',
      description: 'RiseVest Blog REST API',
    },
    host: 'localhost:5000',
  },
  apis: [...routeApis, './src/resources/api/swagger_defs/*.yml'],
};
