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
const Orders_1 = require("../models/Orders");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const store = new Orders_1.OrderStore();
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.headers.authorization;
        let token = '';
        if (authorizationHeader) {
            token = authorizationHeader.split(' ')[1];
        }
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    const id = req.body.user_id;
    try {
        const result = store.show(id);
        res.json(result);
    }
    catch (err) {
        res.status(400);
        res.json({ err });
    }
});
const orderMount = (app) => {
    app.get('/order/:user_id', show);
};
exports.default = orderMount;
