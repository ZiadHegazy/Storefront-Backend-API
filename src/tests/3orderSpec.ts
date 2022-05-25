import { OrderStore } from '../models/Orders';
const store = new OrderStore();
describe('Order Model', () => {
  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });
  it('should have an add method', () => {
    expect(store.add).toBeDefined();
  });
  it('add method should add new order', async () => {
    expect(await store.add(1)).toEqual({ user_id: 1, status: 'active' });
  });
  it('show method should return an order', async () => {
    expect(await store.show(1)).toEqual({
      orderid: 1,
      products: [],
      status: 'active',
    });
  });
});
