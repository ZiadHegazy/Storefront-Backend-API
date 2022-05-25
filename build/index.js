"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const ProductHandler_1 = __importDefault(require("./handlers/ProductHandler"));
const OrderHandler_1 = __importDefault(require("./handlers/OrderHandler"));
const UserHandler_1 = __importDefault(require("./handlers/UserHandler"));
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(0, ProductHandler_1.default)(app);
(0, OrderHandler_1.default)(app);
(0, UserHandler_1.default)(app);
app.listen(3000, function () {
    console.log('listening to port 3000');
});
exports.default = app;
