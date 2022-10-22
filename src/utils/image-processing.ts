import { promises as fs } from 'fs';
import sharp, { OutputInfo } from 'sharp';
export const thumbFolder = 'image/thumb/';
export const fullFolder = 'image/full/';

export const isExistingThumb = async (name: string, width: number, height: number): Promise<boolean> => {
  const thumbFiles = await fs.readdir(thumbFolder);
  return thumbFiles.some(
    f =>
      f.includes(name) &&
      f.includes(width.toString()) &&
      f.includes(height.toString())
  );
};

export const existingFullFile = async (name: string): Promise<string> => {
  const fullFiles = await fs.readdir(fullFolder);
  return fullFiles.find(f => f.includes(name)) || '';
};

export const resizeImage = async (existingFile: string, width: number, height: number, filePath: string): Promise<OutputInfo> => {
  const file = await fs.readFile(`${fullFolder}${existingFile}`);
  return await sharp(file).resize(width, height).toFile(filePath);
};