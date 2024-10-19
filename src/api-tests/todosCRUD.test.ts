import { apiClient, createTodo, createUser } from '../utils';

describe('/todos CRUD Operations', () => {
  let userTodo: any;
  let userId: number;
  let todoId: number;

  beforeAll(async () => {
    const response = await apiClient.post('/users', createUser()).expect(201);
    userId = response.body.id;
    userTodo = createTodo(userId, { status: 'pending' });
  });

  afterAll(async () => {
    if (userId !== undefined) {
      await apiClient.delete(`/users/${userId}`).expect(204);
    }
  });

  it('should create a new todo', async () => {
    await apiClient
      .post('/todos', userTodo)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body).toMatchObject(userTodo);
        todoId = response.body.id;
      });
  });

  it('should retrieve todo details', async () => {
    await apiClient
      .get(`/todos/${todoId}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toStrictEqual({ ...userTodo, id: todoId });
      });
  });

  it('should update the todo details', async () => {
    const updatedTodo = createTodo(userTodo.user_id, { status: 'completed' });

    await apiClient
      .put(`/todos/${todoId}`, updatedTodo)
      .expect(200)
      .then((response) => expect(response.body).toStrictEqual({ ...userTodo, ...updatedTodo, id: todoId }));
  });

  it('should delete the todo', async () => {
    await apiClient.delete(`/todos/${todoId}`).expect(204);
  });
});
