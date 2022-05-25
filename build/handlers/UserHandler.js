"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Users_1 = require("../models/Users");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const store = new Users_1.UserStore();
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = bcrypt_1.default.hashSync(req.body.password + process.env.BCRYPT_PASSWORD, parseInt(process.env.SALT_ROUNDS));
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hash,
    };
    const u = yield store.authenticate(user);
    if (u != null) {
        const token = jsonwebtoken_1.default.sign({ user: u }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    else {
        res.status(400);
        res.send('invalid username of password');
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const authorizationHeader = req.headers.authorization;
        // let token = '';
        // if (authorizationHeader) {
        //   token = authorizationHeader.split(' ')[1];
        // }
        const token = req.body.token;
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt_1.default.hashSync(req.body.password + process.env.BCRYPT_PASSWORD, parseInt(process.env.SALT_ROUNDS)),
    };
    try {
        const newUser = yield store.create(user);
        if (newUser != null) {
            const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
            res.json(token);
        }
        else {
            res.send('this is a repeated first and lastname');
        }
    }
    catch (err) {
        res.status(400);
        res.json({ err });
    }
});
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const authorizationHeader = req.headers.authorization;
        // let token = '';
        // if (authorizationHeader) {
        //   token = authorizationHeader.split(' ')[1];
        // }
        const token = req.body.token;
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    try {
        const result = yield store.index();
        res.json(result);
    }
    catch (err) {
        res.status(400);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const authorizationHeader = req.headers.authorization;
        // let token = '';
        // if (authorizationHeader) {
        //   token = authorizationHeader.split(' ')[1];
        // }
        const token = req.body.token;
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    try {
        const id = req.body.id;
        const result = store.show(id);
        res.json(result);
    }
    catch (err) {
        res.status(400);
        res.json('invalid user id');
    }
});
const userMount = (app) => {
    app.post('/', authenticate);
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', create);
};
exports.default = userMount;
