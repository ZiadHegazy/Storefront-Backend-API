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
const fs_1 = require("fs");
const sharp_1 = __importDefault(require("sharp"));
const checkInFull = (image) => __awaiter(void 0, void 0, void 0, function* () {
    const full = yield fs_1.promises.readdir('./full');
    let i = 0;
    for (i = 0; i < full.length; i++) {
        if (full[i] == image || full[i] == image + '.jpg') {
            return true;
        }
    }
    return false;
});
const checkInThumb = (image) => __awaiter(void 0, void 0, void 0, function* () {
    const thumb = yield fs_1.promises.readdir('./thumb');
    let i = 0;
    for (i = 0; i < thumb.length; i++) {
        if (thumb[i] == image || thumb[i] == image + '.jpg') {
            return true;
        }
    }
    return false;
});
const transform = (name, width, height, name2) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, sharp_1.default)('./full/' + name + '.jpg')
        .resize(width, height)
        .toFile('./thumb/' + name2 + '.jpg');
});
exports.default = {
    checkInFull,
    checkInThumb,
    transform,
};
