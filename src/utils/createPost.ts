import { faker } from '@faker-js/faker';

export const createPost = (user_id: number, options: { title?: string; body?: string } = {}) => {
  return {
    user_id,
    title: options.title ?? faker.lorem.sentence(3),
    body: options.body ?? faker.lorem.sentence(10),
  };
};
