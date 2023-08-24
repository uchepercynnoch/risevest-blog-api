import { CoreTypes } from '../../../@types/core';
import { fakeSuperUser } from '../../../resources/fake';
import AbstractCrudRepository = CoreTypes.AbstractCrudRepository;

export default class SeedUtil {
  constructor(private readonly userRepository: AbstractCrudRepository) {}

  public async run() {
    await this.loadSuperUser();
  }

  private async loadSuperUser() {
    const user = await this.userRepository.findById(1);

    if (user) return;
    await this.userRepository.save(fakeSuperUser);
  }
}
