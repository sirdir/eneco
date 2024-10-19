import { apiClient, createPost, createUser } from '../utils';

describe('/posts CRUD Operations', () => {
  let userPost: any;
  let userId: number;
  let postId: number;

  beforeAll(async () => {
    const response = await apiClient.post('/users', createUser()).expect(201);
    userId = response.body.id;
    userPost = createPost(userId);
  });

  afterAll(async () => {
    if (userId !== undefined) {
      await apiClient.delete(`/users/${userId}`).expect(204);
    }
  });

  it('should create a new post', async () => {
    await apiClient
      .post('/posts', userPost)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body).toMatchObject(userPost);
        postId = response.body.id;
      });
  });

  it('should retrieve post details', async () => {
    await apiClient
      .get(`/posts/${postId}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toStrictEqual({ ...userPost, id: postId });
      });
  });

  it('should update the post details', async () => {
    const updatedPost = createPost(userPost.user_id);

    await apiClient
      .put(`/posts/${postId}`, updatedPost)
      .expect(200)
      .then((response) => expect(response.body).toStrictEqual({ ...userPost, ...updatedPost, id: postId }));
  });

  it('should delete the post', async () => {
    await apiClient.delete(`/posts/${postId}`).expect(204);
  });
});
