import { apiClient, createUser } from '../utils';

describe('/users CRUD Operations', () => {
  const userData = createUser({ status: 'active' });
  let userId: number;

  it('should create a new user', async () => {
    await apiClient
      .post('/users', userData)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body).toMatchObject(userData);
        userId = response.body.id;
      });
  });

  it('should retrieve user details', async () => {
    await apiClient
      .get(`/users/${userId}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toStrictEqual({ ...userData, id: userId });
      });
  });

  it('should update the user details', async () => {
    const updatedUser = createUser({ status: 'inactive' });

    await apiClient
      .put(`/users/${userId}`, updatedUser)
      .expect(200)
      .then((response) => expect(response.body).toStrictEqual({ ...userData, ...updatedUser, id: userId }));
  });

  it('should delete the user', async () => {
    await apiClient.delete(`/users/${userId}`).expect(204);
  });
});
