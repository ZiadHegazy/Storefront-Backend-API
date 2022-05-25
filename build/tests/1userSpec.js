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
const Users_1 = require("../models/Users");
describe('user model', () => {
    const store = new Users_1.UserStore();
    it('should have show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have index method', () => {
        expect(store.index).toBeDefined();
    });
    it('index method should return a list of Users', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = store.index();
        expect(yield result).toEqual([]);
    }));
    it('create method should add a User', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = store.create({
            firstName: 'ziad',
            lastName: 'ayman',
            password: '123',
        });
        expect(yield result).toEqual({
            firstName: 'ziad',
            lastName: 'ayman',
            password: '123',
        });
    }));
    it('create method should not add a User with repeated firstname and lastname', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield store.create({
            firstName: 'ziad',
            lastName: 'ayman',
            password: '123',
        })).toEqual(null);
    }));
    it('show method should return a User', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = store.show(1);
        expect(yield result).toEqual({
            id: 1,
            firstName: 'ziad',
            lastName: 'ayman',
            password: '123',
        });
    }));
});
