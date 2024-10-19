import { faker } from '@faker-js/faker';

export type TodoStatus = 'completed' | 'pending';

export const createTodo = (user_id: number, options: { title?: string; due_on?: string; status?: TodoStatus } = {}) => {
  return {
    user_id,
    title: options.title ?? faker.lorem.sentence(3),
    // looks like there is a bug on backend side. It ignores provided timezone offset and use the default timezone +05:30
    due_on: options.due_on ?? `${faker.date.future().toISOString().replace('Z', '+05:30')}`,
    status: options.status ?? faker.helpers.arrayElement(['completed', 'pending']),
  };
};
