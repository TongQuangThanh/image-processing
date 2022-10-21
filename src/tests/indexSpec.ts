import supertest from 'supertest';
import { app } from '../index';

const request = supertest(app);

describe('Test responses from endpoints', (): void => {
  describe('endpoint: /', (): void => {
    it('gets /', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/');

      expect(response.status).toBe(200);
    });
  });

  describe('endpoint: /api/image', (): void => {
    it('gets /api/image?filename=fjord (valid args)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/image?filename=fjord'
      );

      expect(response.status).toBe(200);
    });

    it('gets /api/image?filename=fjord&width=199&height=199 (valid args)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/image?filename=fjord&width=199&height=199'
      );

      expect(response.status).toBe(200);
    });

    it('gets /api/image?filename=fjord&width=-200&height=200 (invalid args)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/image?filename=fjord&width=-200&height=200'
      );

      expect(response.status).toBe(200);
    });

    it('gets /api/image?filename=zzzzz&width=-200&height=200 (invalid name)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/image?filename=fjord&width=-200&height=200'
      );

      expect(response.status).toBe(200);
    });

    it('gets /api/image (no arguments)', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/api/image');

      expect(response.status).toBe(200);
    });
  });

  describe('endpoint: /foo', (): void => {
    it('returns 404 for invalid endpoint', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/foo');

      expect(response.status).toBe(404);
    });
  });
});
