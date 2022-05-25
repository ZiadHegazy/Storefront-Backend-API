import { UserStore } from '../models/Users';
describe('user model', () => {
  const store = new UserStore();
  it('should have show method', () => {
    expect(store.show).toBeDefined();
  });
  it('should have create method', () => {
    expect(store.create).toBeDefined();
  });
  it('should have index method', () => {
    expect(store.index).toBeDefined();
  });
  it('index method should return a list of Users', async () => {
    const result = store.index();
    expect(await result).toEqual([]);
  });
  it('create method should add a User', async () => {
    const result = store.create({
      firstName: 'ziad',
      lastName: 'ayman',
      password: '123',
    });
    expect(await result).toEqual({
      firstName: 'ziad',
      lastName: 'ayman',
      password: '123',
    });
  });
  it('create method should not add a User with repeated firstname and lastname', async () => {
    expect(
      await store.create({
        firstName: 'ziad',
        lastName: 'ayman',
        password: '123',
      })
    ).toEqual(null);
  });
  it('show method should return a User', async () => {
    const result = store.show(1);
    expect(await result).toEqual({
      id: 1,
      firstName: 'ziad',
      lastName: 'ayman',
      password: '123',
    });
  });
});
