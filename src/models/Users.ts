import Client from '../database';
import dotenv from 'dotenv';
dotenv.config();
export type Users = {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
};
export class UserStore {
  async index(): Promise<Users[]> {
    const conn = await Client.connect();
    const sql = 'SELECT * FROM Users';
    const result = await conn.query(sql);
    conn.release();
    return result.rows;
  }
  async show(id: number): Promise<Users> {
    const conn = await Client.connect();
    const sql = 'SELECT * FROM Users WHERE id=($1)';
    const result = await conn.query(sql, [id]);
    conn.release();
    return {
      id: parseInt(result.rows[0].id),
      firstName: result.rows[0].firstname,
      lastName: result.rows[0].lastname,
      password: result.rows[0].password,
    };
  }
  async create(User: {
    firstName: string;
    lastName: string;
    password: string;
  }): Promise<{
    firstName: string;
    lastName: string;
    password: string;
  } | null> {
    const conn = await Client.connect();
    const sql2 = 'SELECT * FROM Users where firstName=($1) and lastName=($2)';
    const result1 = await conn.query(sql2, [User.firstName, User.lastName]);
    if (result1.rowCount == 0) {
      const sql =
        'INSERT INTO Users(firstName,lastName,password) VALUES($1,$2,$3) Returning firstName,lastName,password';
      const result = await conn.query(sql, [
        User.firstName,
        User.lastName,
        User.password,
      ]);
      conn.release();
      return {
        firstName: result.rows[0].firstname,
        lastName: result.rows[0].lastname,
        password: result.rows[0].password,
      };
    } else {
      conn.release();
      return null;
    }
  }
  async authenticate(User: {
    firstName: string;
    lastName: string;
    password: string;
  }): Promise<Users | null> {
    const conn = await Client.connect();
    const sql =
      'SELECT * FROM Users WHERE firstName=($1) and lastName=($2) and password=($3)';
    const result = await conn.query(sql, [
      User.firstName,
      User.lastName,
      User.password,
    ]);
    conn.release();
    if (result.rowCount != 0) {
      return result.rows[0];
    } else {
      return null;
    }
  }
}
