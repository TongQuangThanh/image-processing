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
exports.imageRouters = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const image_processing_1 = require("../utils/image-processing");
exports.imageRouters = express_1.default.Router();
exports.imageRouters.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const defaultSize = 0;
    const name = (_a = req.query.filename) === null || _a === void 0 ? void 0 : _a.toString();
    let width = defaultSize;
    if (req.query.width) {
        width = +req.query.width > 0 ? +req.query.width : defaultSize;
    }
    if (width <= 0) {
        res.send('Please provide positive width');
        return;
    }
    let height = defaultSize;
    if (req.query.height) {
        height = +req.query.height > 0 ? +req.query.height : defaultSize;
    }
    if (height <= 0) {
        res.send('Please provide positive height');
        return;
    }
    let result = '';
    let errorMessage = '';
    if (name) {
        try {
            const filePath = `${image_processing_1.thumbFolder}${name}&width=${width}&height=${height}.png`;
            if (yield (0, image_processing_1.isExistingThumb)(name, width, height)) {
                result = filePath;
            }
            else {
                const existingFile = yield (0, image_processing_1.existingFullFile)(name);
                if (existingFile) {
                    yield (0, image_processing_1.resizeImage)(existingFile, width, height, filePath);
                    result = filePath;
                }
                else {
                    errorMessage = 'File not found, please input another one';
                }
            }
        }
        catch (error) {
            errorMessage = 'Error!!! Please try again later';
        }
    }
    else {
        errorMessage = 'Please input file name';
    }
    errorMessage ? res.send(errorMessage) : res.sendFile(path_1.default.resolve(result));
}));
