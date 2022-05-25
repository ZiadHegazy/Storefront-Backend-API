import express from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserStore } from '../models/Users';
import dotenv from 'dotenv';
dotenv.config();
const store = new UserStore();
const authenticate = async (req: express.Request, res: express.Response) => {
  const hash = bcrypt.hashSync(
    req.body.password + process.env.BCRYPT_PASSWORD,
    parseInt(process.env.SALT_ROUNDS as string)
  );
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: hash,
  };
  const u = await store.authenticate(user);
  if (u != null) {
    const token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as Secret);
    res.json(token);
  } else {
    res.status(400);
    res.send('invalid username of password');
  }
};
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
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: bcrypt.hashSync(
      req.body.password + process.env.BCRYPT_PASSWORD,
      parseInt(process.env.SALT_ROUNDS as string)
    ),
  };
  try {
    const newUser = await store.create(user);
    if (newUser != null) {
      const token = jwt.sign(
        { user: newUser },
        process.env.TOKEN_SECRET as Secret
      );
      res.json(token);
    } else {
      res.send('this is a repeated first and lastname');
    }
  } catch (err) {
    res.status(400);
    res.json({ err });
  }
};
const index = async (req: express.Request, res: express.Response) => {
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
  try {
    const result = await store.index();
    res.json(result);
  } catch (err) {
    res.status(400);
  }
};
const show = async (req: express.Request, res: express.Response) => {
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
  try {
    const id = req.body.id;
    const result = store.show(id);
    res.json(result);
  } catch (err) {
    res.status(400);
    res.json('invalid user id');
  }
};
const userMount = (app: express.Application) => {
  app.post('/', authenticate);
  app.get('/users', index);
  app.get('/users/:id', show);
  app.post('/users', create);
};
export default userMount;
