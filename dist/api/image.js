'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.imageRouters = void 0;
const express_1 = __importDefault(require('express'));
const sharp_1 = __importDefault(require('sharp'));
const fs_1 = require('fs');
const path_1 = __importDefault(require('path'));
exports.imageRouters = express_1.default.Router();
const thumbFolder = 'image/thumb/';
const fullFolder = 'image/full/';
exports.imageRouters.get('/', (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const defaultSize = 0;
    const name =
      (_a = req.query.filename) === null || _a === void 0
        ? void 0
        : _a.toString();
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
        const thumbFiles = yield fs_1.promises.readdir(thumbFolder);
        const filePath = `${thumbFolder}${name}&width=${width}&height=${height}.png`;
        const existingThumb = thumbFiles.find(
          f =>
            f.includes(name) &&
            f.includes(width.toString()) &&
            f.includes(height.toString())
        );
        if (existingThumb) {
          result = filePath;
        } else {
          const fullFiles = yield fs_1.promises.readdir(fullFolder);
          const existingFile = fullFiles.find(f => f.includes(name));
          if (existingFile) {
            const file = yield fs_1.promises.readFile(
              `${fullFolder}${existingFile}`
            );
            yield (0, sharp_1.default)(file)
              .resize(width, height)
              .toFile(filePath);
            result = filePath;
          } else {
            errorMessage = 'File not found, please input another one';
          }
        }
      } catch (error) {
        errorMessage = 'Error!!! Please try again later';
      }
    } else {
      errorMessage = 'Please input file name';
    }
    errorMessage
      ? res.send(errorMessage)
      : res.sendFile(path_1.default.resolve(result));
  })
);
