import { Router } from 'express';

import endpoints from './route.endpoints';
import RoutesAsyncWrapperMiddleware from '../../modules/core/middleware/routes-async-wrapper.middleware';

const routes = Router();

endpoints.forEach((value) => {
  routes[value.method](value.path, RoutesAsyncWrapperMiddleware.wrap(value.handler));
});

export default routes;
