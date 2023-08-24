import { loginUserRouteHandler } from '../routes/auth.routes';
import { CoreTypes } from '../../../@types/core';
import RouteEndpointsType = CoreTypes.RouteEndpointsType;

const authEndpoints: RouteEndpointsType = [
  {
    name: 'Login User',
    path: '/login',
    method: 'post',
    handler: loginUserRouteHandler,
  },
];

export default authEndpoints;
