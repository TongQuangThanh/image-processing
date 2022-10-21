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
exports.app = void 0;
const express_1 = __importDefault(require('express'));
const http_1 = __importDefault(require('http'));
const image_1 = require('./api/image');
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, Accept, Content-Type, X-Requested-With, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, DELETE, PUT, OPTIONS, PATCH'
  );
  next();
});
const normalizePort = val => {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
};
const port = normalizePort(process.env.PORT || '3080');
exports.app.set('port', port);
const server = http_1.default.createServer(exports.app);
server.on('error', error => {
  if (error.syscall !== 'listen') throw error;
});
exports.app.get('/', (req, res, next) => {
  res.send(
    'Welcome!!! Type image name and image width, height in url to get resized image (default width, height iss 200px)'
  );
});
exports.app.use('/api/image', image_1.imageRouters);
server.listen(port, () =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log(
      `[server]: Server is running on port ${port}, current time: `,
      new Date()
    );
  })
);
