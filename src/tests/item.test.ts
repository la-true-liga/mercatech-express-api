import request from 'supertest';

import app from '../app';

describe('Delete item tests', () => {

  /*test('Delete item with missing ID', async () => {
    let id;
    const response = await request(app).delete(`/api/items/${id}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({error: 'Missing item ID'});
  });*/
  test('Delete item with valid ID', async () => {
    const postResponse = await request(app).post('/api/items/').send({name: 'test2'});
    const id = postResponse.body.itemId;
    expect(id).toBeDefined();
    const response = await request(app).delete(`/api/items/${id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Item deleted successfully' });
  });
  test('Delete item with invalid ID', async () => {
    const postResponse = await request(app).post('/api/items/').send({name: 'test2'});
    const id = postResponse.body.itemId;
    expect(id).toBeDefined();
    await request(app).del(`/api/items/${id}`);
    const response = await request(app).del(`/api/items/${id}`);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({error: 'Error deleting item'});
  });
  test('Delete item with negative ID', async () => {
    const response = await request(app).del(`/api/items/-1`);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({error: 'Error deleting item'});
  });
});

