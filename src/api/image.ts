import express from 'express';
import path from 'path';
import { existingFullFile, isExistingThumb, resizeImage, thumbFolder } from '../utils/image-processing';
export const imageRouters = express.Router();

imageRouters.get('/', async (req: express.Request, res: express.Response): void => {
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
      const filePath = `${thumbFolder}${name}&width=${width}&height=${height}.png`;
      if (await isExistingThumb(name, width, height)) {
        result = filePath;
      } else {
        const existingFile = await existingFullFile(name);
        if (existingFile) {
          await resizeImage(existingFile, width, height, filePath);
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
