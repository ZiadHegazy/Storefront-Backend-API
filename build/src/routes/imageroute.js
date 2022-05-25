"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const fun = __importStar(require("../modules/functions"));
const routes = express_1.default.Router();
routes.get('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // check if there is missing parameters
        if (!req.query.width || !req.query.height || !req.query.filename) {
            res.send('please enter a filename and height and a width');
        }
        else if (Number(req.query.width) <= 0 ||
            Number(req.query.height) <= 0 ||
            isNaN(Number(req.query.width)) ||
            isNaN(Number(req.query.height))) {
            res.send('please enter a valid positive integer of height and a width');
        }
        else {
            const path = String(req.query.filename);
            let path2 = '';
            if (path.includes('.jpg')) {
                path2 = path.substring(0, path.length - 4);
            }
            else {
                path2 = path;
            }
            // Check if the filename is found
            const inFull = yield fun.default.checkInFull(path2);
            if (!inFull) {
                res.send('the file name is not found');
            }
            else {
                // check if the required size is found
                const inThumb = yield fun.default.checkInThumb(path2 + '_' + req.query.width + '_' + req.query.height);
                if (!inThumb) {
                    yield fun.default.transform(path2, Number(req.query.width), Number(req.query.height), path2 + '_' + req.query.width + '_' + req.query.height);
                    const image = yield fs_1.promises.readFile('./thumb/' +
                        path2 +
                        '_' +
                        req.query.width +
                        '_' +
                        req.query.height +
                        '.jpg');
                    res.end(image);
                }
                else {
                    const image = yield fs_1.promises.readFile('./thumb/' +
                        path2 +
                        '_' +
                        req.query.width +
                        '_' +
                        req.query.height +
                        '.jpg');
                    res.end(image);
                }
            }
        }
    });
});
exports.default = routes;
