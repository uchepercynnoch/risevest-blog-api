import { Server } from 'http';
import { SQLDatabase } from '../../../config/database/sql.database';
import Settings from '../../../config/settings';
import LoggerUtil from '../utils/logger.util';
import * as util from 'util';
import SeedUtil from '../utils/seed.util';
import UserRepository from '../../users/repositories/user.repository';

export default async function start(server: Server) {
  const logger = LoggerUtil.init(start.name).logger;

  try {
    const PORT = process.env.PORT ?? 5050;

    await Settings.init();

    const sqlDB = SQLDatabase.init();

    await sqlDB.sequelize.sync({ force: true, logging: false });

    const seedUtil = new SeedUtil(new UserRepository());

    await seedUtil.run();

    server.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
  } catch (e: unknown) {
    logger.error(util.inspect(e));
  }
}
