import { faker } from '@faker-js/faker';

export const fakeSuperUser = {
  id: 1,
  name: faker.person.fullName(),
};
