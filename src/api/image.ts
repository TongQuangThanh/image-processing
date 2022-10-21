import express from 'express';
import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
export const imageRouters = express.Router();

const thumbFolder = 'image/thumb/';
const fullFolder = 'image/full/';

imageRouters.get('/', async (req, res) => {
  const defaultSize = 0;
  const name = req.query.filename?.toString();
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
      const thumbFiles = await fs.readdir(thumbFolder);
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
        const fullFiles = await fs.readdir(fullFolder);
        const existingFile = fullFiles.find(f => f.includes(name));
        if (existingFile) {
          const file = await fs.readFile(`${fullFolder}${existingFile}`);
          await sharp(file).resize(width, height).toFile(filePath);
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
  errorMessage ? res.send(errorMessage) : res.sendFile(path.resolve(result));
});
