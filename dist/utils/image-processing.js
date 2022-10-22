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
exports.resizeImage = exports.existingFullFile = exports.isExistingThumb = exports.fullFolder = exports.thumbFolder = void 0;
const fs_1 = require("fs");
const sharp_1 = __importDefault(require("sharp"));
exports.thumbFolder = 'image/thumb/';
exports.fullFolder = 'image/full/';
const isExistingThumb = (name, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    const thumbFiles = yield fs_1.promises.readdir(exports.thumbFolder);
    return thumbFiles.some(f => f.includes(name) &&
        f.includes(width.toString()) &&
        f.includes(height.toString()));
});
exports.isExistingThumb = isExistingThumb;
const existingFullFile = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const fullFiles = yield fs_1.promises.readdir(exports.fullFolder);
    return fullFiles.find(f => f.includes(name)) || '';
});
exports.existingFullFile = existingFullFile;
const resizeImage = (existingFile, width, height, filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const file = yield fs_1.promises.readFile(`${exports.fullFolder}${existingFile}`);
    return yield (0, sharp_1.default)(file).resize(width, height).toFile(filePath);
});
exports.resizeImage = resizeImage;
