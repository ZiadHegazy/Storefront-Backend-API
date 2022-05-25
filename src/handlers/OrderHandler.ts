import express from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { OrderStore } from '../models/Orders';
import dotenv from 'dotenv';
dotenv.config();
const store = new OrderStore();
const show = async (req: express.Request, res: express.Response) => {
  try {
    const authorizationHeader = req.headers.authorization;
    let token = '';
    if (authorizationHeader) {
      token = authorizationHeader.split(' ')[1];
    }
    jwt.verify(token, process.env.TOKEN_SECRET as Secret);
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }
  const id = req.body.user_id;
  try {
    const result = store.show(id);

    res.json(result);
  } catch (err) {
    res.status(400);
    res.json({ err });
  }
};
const orderMount = (app: express.Application) => {
  app.get('/order/:user_id', show);
};
export default orderMount;
