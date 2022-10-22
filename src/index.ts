import express from 'express';
import http from 'http';
import { imageRouters } from './api/image';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
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

const port = 3080;
app.set('port', port);
const server = http.createServer(app);

app.get('/', (req: express.Request, res: express.Response): void => {
  res.send(
    'Welcome!!! Type image name and image width, height in url to get resized image (default width, height is 200px)'
  );
});
app.use('/api/image', imageRouters);

server.listen(port, async (): Promise<void> => {
  console.log(
    `[server]: Server is running on port ${port}, current time: `,
    new Date()
  );
});
