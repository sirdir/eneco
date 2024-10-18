import { apiClient, createPost, createComment, createUser } from '../utils';

describe('/comments CRUD Operations', () => {
  let userComment: any;
  let userId: number;
  let postId: number;
  let commnentId: number;

  beforeAll(async () => {
    const userResponse = await apiClient.post('/users', createUser()).expect(201);
    userId = userResponse.body.id;
    const postResponse = await apiClient.post('/posts', createPost(userId)).expect(201);
    postId = postResponse.body.id;
    userComment = createComment(postId);
  });

  afterAll(async () => {
    if (postId !== undefined) {
      await apiClient.delete(`/posts/${postId}`).expect(204);
    }
    if (userId !== undefined) {
      await apiClient.delete(`/users/${userId}`).expect(204);
    }
  });

  it('should create a new comment', async () => {
    await apiClient
      .post('/comments', userComment)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body).toMatchObject(userComment);
        commnentId = response.body.id;
      });
  });

  it('should retrieve comment details', async () => {
    await apiClient
      .get(`/comments/${commnentId}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toStrictEqual({ ...userComment, id: commnentId });
      });
  });

  it('should update the comment details', async () => {
    const updatedComment = createComment(postId);

    await apiClient
      .put(`/comments/${commnentId}`, updatedComment)
      .expect(200)
      .then((response) => expect(response.body).toStrictEqual({ ...userComment, ...updatedComment, id: commnentId }));
  });

  it('should delete the comment', async () => {
    await apiClient.delete(`/comments/${commnentId}`).expect(204);
  });
});
