import supertest from 'supertest';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });

const API_BASE_URL = 'https://gorest.co.in/public/v2';
const TOKEN = process.env.BEARER_TOKEN;

const request = supertest(API_BASE_URL);

export const apiClient = {
  get: (url: string) => request.get(url).set('Authorization', `Bearer ${TOKEN}`),
  post: (url: string, body: object) => request.post(url).set('Authorization', `Bearer ${TOKEN}`).send(body),
  put: (url: string, body: object) => request.put(url).set('Authorization', `Bearer ${TOKEN}`).send(body),
  delete: (url: string) => request.delete(url).set('Authorization', `Bearer ${TOKEN}`),
};
