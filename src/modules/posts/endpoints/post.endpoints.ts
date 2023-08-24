import { createPostCommentRouteHandler, createPostRouteHandler, getPostsRouteHandler } from '../routes/post.routes';
import { CoreTypes } from '../../../@types/core';
import RouteEndpointsType = CoreTypes.RouteEndpointsType;

const postEndpoints: RouteEndpointsType = [
  {
    name: 'Create Post',
    path: '/posts',
    method: 'post',
    handler: createPostRouteHandler,
  },
  {
    name: 'Get Posts',
    path: '/posts',
    method: 'get',
    handler: getPostsRouteHandler,
  },
  {
    name: 'Create Post Comment',
    path: '/posts/:postId/comments',
    method: 'put',
    handler: createPostCommentRouteHandler,
  },
];

export default postEndpoints;
