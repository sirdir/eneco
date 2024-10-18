import { faker } from '@faker-js/faker';

export const createComment = (post_id: number, options: { name?: string; email?: string; body?: string } = {}) => {
  return {
    post_id,
    name: options.name ?? faker.person.fullName(),
    email: options.email ?? faker.internet.email(),
    body: options.body ?? faker.lorem.sentence(3),
  };
};
