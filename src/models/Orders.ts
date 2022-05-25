import Client from '../database';
export type Orders = {
  orderid: number;
  products: { product_id: number; product_quantity: number }[];
  status: string;
};
export class OrderStore {
  async show(id: number): Promise<Orders> {
    const conn = await Client.connect();
    const sql = 'SELECT id FROM Orders WHERE user_id=($1) and status=($2) ';
    const result = await conn.query(sql, [id, 'active']);
    const orderid = parseInt(result.rows[0].id);
    const sql2 =
      'SELECT product_id,product_quantity FROM Order_Product where order_id=($1)';
    const result2 = await conn.query(sql2, [orderid]);
    conn.release();
    return { orderid: orderid, products: result2.rows, status: 'active' };
  }
  async add(id: number): Promise<{ user_id: number; status: string }> {
    const conn = await Client.connect();
    const sql =
      'INSERT INTO Orders(user_id,status) VALUES($1,$2) Returning user_id,status';
    const result = await conn.query(sql, [id, 'active']);
    return result.rows[0];
  }
}
