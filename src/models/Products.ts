import Client from '../database';
export type Products = {
  id: number;
  name: string;
  price: number;
  category: string;
};
export class ProductStore {
  async index(): Promise<Products[]> {
    const conn = await Client.connect();
    const sql = 'SELECT * FROM Products';
    const result = await conn.query(sql);
    conn.release();
    return result.rows;
  }
  async show(id: number): Promise<Products> {
    const conn = await Client.connect();
    const sql = 'SELECT * FROM Products WHERE id=($1)';
    const result = await conn.query(sql, [id]);
    conn.release();
    return result.rows[0];
  }
  async create(product: {
    name: string;
    price: number;
    category: string;
  }): Promise<Products> {
    const conn = await Client.connect();
    const sql =
      'INSERT INTO Products(name,price,category) VALUES($1,$2,$3) RETURNING *';
    const result = await conn.query(sql, [
      product.name,
      product.price,
      product.category,
    ]);
    conn.release();
    return result.rows[0];
  }
}
