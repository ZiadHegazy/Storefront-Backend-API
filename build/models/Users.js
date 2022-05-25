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
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class UserStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = 'SELECT * FROM Users';
            const result = yield conn.query(sql);
            conn.release();
            return result.rows;
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = 'SELECT * FROM Users WHERE id=($1)';
            const result = yield conn.query(sql, [id]);
            conn.release();
            return {
                id: parseInt(result.rows[0].id),
                firstName: result.rows[0].firstname,
                lastName: result.rows[0].lastname,
                password: result.rows[0].password,
            };
        });
    }
    create(User) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql2 = 'SELECT * FROM Users where firstName=($1) and lastName=($2)';
            const result1 = yield conn.query(sql2, [User.firstName, User.lastName]);
            if (result1.rowCount == 0) {
                const sql = 'INSERT INTO Users(firstName,lastName,password) VALUES($1,$2,$3) Returning firstName,lastName,password';
                const result = yield conn.query(sql, [
                    User.firstName,
                    User.lastName,
                    User.password,
                ]);
                conn.release();
                return {
                    firstName: result.rows[0].firstname,
                    lastName: result.rows[0].lastname,
                    password: result.rows[0].password,
                };
            }
            else {
                conn.release();
                return null;
            }
        });
    }
    authenticate(User) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = 'SELECT * FROM Users WHERE firstName=($1) and lastName=($2) and password=($3)';
            const result = yield conn.query(sql, [
                User.firstName,
                User.lastName,
                User.password,
            ]);
            conn.release();
            if (result.rowCount != 0) {
                return result.rows[0];
            }
            else {
                return null;
            }
        });
    }
}
exports.UserStore = UserStore;
