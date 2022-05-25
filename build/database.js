"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { host, database, database_test, user, pass, env } = process.env;
let client;
if (env == 'dev') {
    client = new pg_1.Pool({
        host: host,
        database: database,
        user: user,
        password: pass,
    });
}
else {
    client = new pg_1.Pool({
        host: host,
        database: database_test,
        user: user,
        password: pass,
    });
}
exports.default = client;
