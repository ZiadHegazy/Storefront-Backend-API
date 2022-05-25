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
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = 'SELECT id FROM Orders WHERE user_id=($1) and status=($2) ';
            const result = yield conn.query(sql, [id, 'active']);
            const orderid = parseInt(result.rows[0].id);
            const sql2 = 'SELECT product_id,product_quantity FROM Order_Product where order_id=($1)';
            const result2 = yield conn.query(sql2, [orderid]);
            conn.release();
            return { orderid: orderid, products: result2.rows, status: 'active' };
        });
    }
    add(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = 'INSERT INTO Orders(user_id,status) VALUES($1,$2) Returning user_id,status';
            const result = yield conn.query(sql, [id, 'active']);
            return result.rows[0];
        });
    }
}
exports.OrderStore = OrderStore;
