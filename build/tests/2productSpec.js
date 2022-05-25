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
const Products_1 = require("../models/Products");
const store = new Products_1.ProductStore();
describe('Product Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('index method should return a list of products', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = store.index();
        expect(yield result).toEqual([]);
    }));
    it('create method should add a product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = store.create({
            name: 'prod1',
            price: 123,
            category: '1st category',
        });
        expect(yield result).toEqual({
            id: 1,
            name: 'prod1',
            price: 123,
            category: '1st category',
        });
    }));
    it('show method should return a product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = store.show(1);
        expect(yield result).toEqual({
            id: 1,
            name: 'prod1',
            price: 123,
            category: '1st category',
        });
    }));
});
