import { createUserPostRouteHandler, createUserRouteHandler, getUsersRouteHandler } from '../routes/user.routes';
import { CoreTypes } from '../../../@types/core';
import RouteEndpointsType = CoreTypes.RouteEndpointsType;

const userEndpoints: RouteEndpointsType = [
  {
    name: 'Create User',
    path: '/users',
    method: 'post',
    handler: createUserRouteHandler,
  },
  {
    name: 'Get Users',
    path: '/users',
    method: 'get',
    handler: getUsersRouteHandler,
  },
  {
    name: 'Create User Post',
    path: '/users/:id/posts',
    method: 'put',
    handler: createUserPostRouteHandler,
  },
];

export default userEndpoints;
