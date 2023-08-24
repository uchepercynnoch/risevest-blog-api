import path from 'node:path';
import GeneralHelper from '../../modules/core/helpers/general.helper';

const modulesDir = path.resolve(__dirname, '../../modules');

export default GeneralHelper.moduleResolver('models', modulesDir);
