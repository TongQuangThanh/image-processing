import path from 'path';
import { promises as fs } from 'fs';
import supertest from 'supertest';
import { app } from '../index';
import { thumbFolder } from '../utils/image-processing';

const request = supertest(app);
const name = 'fjord.jpg';
const width = 199;
const height = 199;

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
        `/api/image?filename=fjord&width=${width}&height=${height}`
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

// Erase test file. Test should not run on productive system to avoid cache loss
afterAll(async (): Promise<void> => {
  const filePath = `${thumbFolder}${name}&width=${width}&height=${height}.png`;
  const resizedImagePath: string = path.resolve(filePath);

  try {
    await fs.access(resizedImagePath);
    fs.unlink(resizedImagePath);
  } catch {
    // intentionally left blank
  }
});