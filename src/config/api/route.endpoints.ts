import { CoreTypes } from '../../@types/core';
import GeneralHelper from '../../modules/core/helpers/general.helper';
import path from 'node:path';
import RouteEndpointsType = CoreTypes.RouteEndpointsType;

const endpoints: RouteEndpointsType = [];
const modulesDir = path.resolve(__dirname, '../../modules');

const results = GeneralHelper.moduleResolver('endpoints', modulesDir);

results.forEach((path) => {
  const file = require(path);

  const endpoint = file.default as RouteEndpointsType;

  endpoint.forEach((route) => {
    endpoints.push(route);
  });
});

export default endpoints;
