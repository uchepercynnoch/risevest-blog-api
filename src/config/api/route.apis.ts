import GeneralHelper from '../../modules/core/helpers/general.helper';
import path from 'node:path';

const modulesDir = path.resolve(__dirname, '../../modules');

export default GeneralHelper.moduleResolver('routes', modulesDir);
