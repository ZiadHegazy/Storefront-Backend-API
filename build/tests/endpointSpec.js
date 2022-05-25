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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const request = (0, supertest_1.default)(index_1.default);
describe('Products end points', () => {
    it('check the products index end point', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/products');
        expect(response.status).toBe(200);
    }));
    it('check the products show end point', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/products/:id');
        expect(response.status).toBe(200);
    }));
    it('check the products create end point', () => __awaiter(void 0, void 0, void 0, function* () {
        const token = jsonwebtoken_1.default.sign('test', process.env.TOKEN_SECRET);
        const response = yield request
            .post('/products')
            .send({ name: 'prod1', price: 123, category: '1st', token: token });
        expect(response.status).toBe(200);
    }));
});
describe('Users end points', () => {
    it('check the users index end point', () => __awaiter(void 0, void 0, void 0, function* () {
        const token = jsonwebtoken_1.default.sign('test', process.env.TOKEN_SECRET);
        const response = yield request.get('/users').send({ token: token });
        expect(response.status).toBe(200);
    }));
    it('check the users show end point', () => __awaiter(void 0, void 0, void 0, function* () {
        const token = jsonwebtoken_1.default.sign('test', process.env.TOKEN_SECRET);
        const response = yield request
            .get('/users/:id')
            .send({ token: token, id: 1 });
        expect(response.status).toBe(200);
    }));
    it('check the users create end point', () => __awaiter(void 0, void 0, void 0, function* () {
        const token = jsonwebtoken_1.default.sign('test', process.env.TOKEN_SECRET);
        const response = yield request
            .post('/users')
            .send({
            token: token,
            firstName: 'test',
            lastName: 'test',
            password: '123',
        });
        expect(response.status).toBe(200);
    }));
});
describe('Orders end points', () => {
    it('check the orders show end point', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/orders/:user_id');
        expect(response.status).toBe(404);
    }));
});
