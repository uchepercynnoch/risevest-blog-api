import { getCommentsRouteHandler } from '../routes/comments.routes';
import { CoreTypes } from '../../../@types/core';
import RouteEndpointsType = CoreTypes.RouteEndpointsType;

const commentsEndpoints: RouteEndpointsType = [
  {
    name: 'Get Comments',
    path: '/posts',
    method: 'get',
    handler: getCommentsRouteHandler,
  },
];

export default commentsEndpoints;
