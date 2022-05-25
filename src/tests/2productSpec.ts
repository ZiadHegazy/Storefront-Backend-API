import { ProductStore } from '../models/Products';
const store = new ProductStore();
describe('Product Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });
  it('index method should return a list of products', async () => {
    const result = store.index();
    expect(await result).toEqual([]);
  });
  it('create method should add a product', async () => {
    const result = store.create({
      name: 'prod1',
      price: 123,
      category: '1st category',
    });
    expect(await result).toEqual({
      id: 1,
      name: 'prod1',
      price: 123,
      category: '1st category',
    });
  });
  it('show method should return a product', async () => {
    const result = store.show(1);
    expect(await result).toEqual({
      id: 1,
      name: 'prod1',
      price: 123,
      category: '1st category',
    });
  });
});
