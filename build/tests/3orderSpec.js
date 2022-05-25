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
Object.defineProperty(exports, "__esModule", { value: true });
const Orders_1 = require("../models/Orders");
const store = new Orders_1.OrderStore();
describe('Order Model', () => {
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have an add method', () => {
        expect(store.add).toBeDefined();
    });
    it('add method should add new order', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield store.add(1)).toEqual({ user_id: 1, status: 'active' });
    }));
    it('show method should return an order', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield store.show(1)).toEqual({
            orderid: 1,
            products: [],
            status: 'active',
        });
    }));
});
