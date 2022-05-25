import supertest from 'supertest';
import app from '../index';
import jwt from 'jsonwebtoken';
const request = supertest(app);
describe('Products end points', () => {
  it('check the products index end point', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
  });
  it('check the products show end point', async () => {
    const response = await request.get('/products/:id');
    expect(response.status).toBe(200);
  });
  it('check the products create end point', async () => {
    const token = jwt.sign('test', process.env.TOKEN_SECRET as string);
    const response = await request
      .post('/products')
      .send({ name: 'prod1', price: 123, category: '1st', token: token });
    expect(response.status).toBe(200);
  });
});
describe('Users end points', () => {
  it('check the users index end point', async () => {
    const token = jwt.sign('test', process.env.TOKEN_SECRET as string);
    const response = await request.get('/users').send({ token: token });
    expect(response.status).toBe(200);
  });
  it('check the users show end point', async () => {
    const token = jwt.sign('test', process.env.TOKEN_SECRET as string);
    const response = await request
      .get('/users/:id')
      .send({ token: token, id: 1 });
    expect(response.status).toBe(200);
  });
  it('check the users create end point', async () => {
    const token = jwt.sign('test', process.env.TOKEN_SECRET as string);
    const response = await request
      .post('/users')
      .send({
        token: token,
        firstName: 'test',
        lastName: 'test',
        password: '123',
      });
    expect(response.status).toBe(200);
  });
});
describe('Orders end points', () => {
  it('check the orders show end point', async () => {
    const response = await request.get('/orders/:user_id');
    expect(response.status).toBe(404);
  });
});
