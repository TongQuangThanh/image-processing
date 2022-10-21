import express from 'express';
import http from 'http';
import { imageRouters } from './api/image';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
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

const normalizePort = (val: string) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
};

const port = normalizePort(process.env.PORT || '3080');
app.set('port', port);
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send(
    'Welcome!!! Type image name and image width, height in url to get resized image (default width, height iss 200px)'
  );
});
app.use('/api/image', imageRouters);

server.listen(port, async () => {
  console.log(
    `[server]: Server is running on port ${port}, current time: `,
    new Date()
  );
});
