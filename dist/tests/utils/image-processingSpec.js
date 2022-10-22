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
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const image_processing_1 = require("../../utils/image-processing");
const name = 'fjord.jpg';
const width = 220;
const height = 220;
const filePath = `${image_processing_1.thumbFolder}${name}&width=${width}&height=${height}.png`;
describe('Test image processing via sharp', () => {
    it('check full file is existing', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, image_processing_1.existingFullFile)('fjord.jpg')).toEqual(name);
    }));
    it('check resize image', () => __awaiter(void 0, void 0, void 0, function* () {
        const file = yield (0, image_processing_1.resizeImage)(name, width, height, filePath);
        expect(file.width).toEqual(width);
        expect(file.height).toEqual(height);
        expect(file.format).toEqual('png');
    }));
    it('check if thumb exist after resize image', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, image_processing_1.isExistingThumb)(name, width, height)).toBeTrue();
    }));
});
// Erase test file. Test should not run on productive system to avoid cache loss
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const resizedImagePath = path_1.default.resolve(filePath);
    try {
        yield fs_1.promises.access(resizedImagePath);
        fs_1.promises.unlink(resizedImagePath);
    }
    catch (_a) {
        // intentionally left blank
    }
}));
