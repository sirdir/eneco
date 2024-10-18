import { faker } from '@faker-js/faker';

export type UserStatus = 'active' | 'inactive';

export const createUser = (options: { name?: string; email?: string; gender?: string; status?: UserStatus } = {}) => {
  return {
    name: options.name ?? faker.internet.userName(),
    email: options.email ?? faker.internet.email(),
    gender: options.gender ?? faker.person.sex(),
    status: options.status ?? faker.helpers.arrayElement(['active', 'inactive']),
  };
};
