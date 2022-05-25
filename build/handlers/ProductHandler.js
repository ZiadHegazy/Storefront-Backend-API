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
const Products_1 = require("../models/Products");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const store = new Products_1.ProductStore();
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
    const prod = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
    };
    try {
        res.json(yield store.create(prod));
    }
    catch (err) {
        res.status(400);
        res.json(err + '' + prod);
    }
});
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield store.index();
        res.json(result);
    }
    catch (err) {
        res.json({ err });
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = store.show(req.body.id);
        res.json(result);
    }
    catch (err) {
        res.json({ err });
    }
});
const productMount = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', create);
};
exports.default = productMount;
