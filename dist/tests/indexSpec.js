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
const supertest_1 = __importDefault(require('supertest'));
const index_1 = require('../index');
const request = (0, supertest_1.default)(index_1.app);
describe('Test responses from endpoints', () => {
  describe('endpoint: /', () => {
    it('gets /', () =>
      __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/');
        expect(response.status).toBe(200);
      }));
  });
  describe('endpoint: /api/image', () => {
    it('gets /api/image?filename=fjord (valid args)', () =>
      __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/image?filename=fjord');
        expect(response.status).toBe(200);
      }));
    it('gets /api/image?filename=fjord&width=199&height=199 (valid args)', () =>
      __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(
          '/api/image?filename=fjord&width=199&height=199'
        );
        expect(response.status).toBe(200);
      }));
    it('gets /api/image?filename=fjord&width=-200&height=200 (invalid args)', () =>
      __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(
          '/api/image?filename=fjord&width=-200&height=200'
        );
        expect(response.status).toBe(200);
      }));
    it('gets /api/image?filename=zzzzz&width=-200&height=200 (invalid name)', () =>
      __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(
          '/api/image?filename=fjord&width=-200&height=200'
        );
        expect(response.status).toBe(200);
      }));
    it('gets /api/image (no arguments)', () =>
      __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/image');
        expect(response.status).toBe(200);
      }));
  });
  describe('endpoint: /foo', () => {
    it('returns 404 for invalid endpoint', () =>
      __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/foo');
        expect(response.status).toBe(404);
      }));
  });
});
