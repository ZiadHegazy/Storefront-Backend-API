import express from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { ProductStore } from '../models/Products';
import dotenv from 'dotenv';
dotenv.config();
const store = new ProductStore();
const create = async (req: express.Request, res: express.Response) => {
  try {
    // const authorizationHeader = req.headers.authorization;
    // let token = '';
    // if (authorizationHeader) {
    //   token = authorizationHeader.split(' ')[1];
    // }
    const token = req.body.token;
    jwt.verify(token, process.env.TOKEN_SECRET as Secret);
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }
  const prod = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  try {
    res.json(await store.create(prod));
  } catch (err) {
    res.status(400);
    res.json(err + '' + prod);
  }
};
const index = async (_req: express.Request, res: express.Response) => {
  try {
    const result = await store.index();
    res.json(result);
  } catch (err) {
    res.json({ err });
  }
};
const show = async (req: express.Request, res: express.Response) => {
  try {
    const result = store.show(req.body.id);
    res.json(result);
  } catch (err) {
    res.json({ err });
  }
};
const productMount = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', create);
};
export default productMount;
