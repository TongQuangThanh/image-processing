import path from 'path';
import { promises as fs } from 'fs';
import { existingFullFile, isExistingThumb, resizeImage, thumbFolder } from '../../utils/image-processing';

const name = 'fjord.jpg';
const width = 220;
const height = 220;
const filePath = `${thumbFolder}${name}&width=${width}&height=${height}.png`;

describe('Test image processing via sharp', (): void => {
  it('check full file is existing', async (): Promise<void> => {
    expect(await existingFullFile('fjord.jpg')).toEqual(name);
  });

  it('check resize image', async (): Promise<void> => {
    const file = await resizeImage(name, width, height, filePath);
    expect(file.width).toEqual(width);
    expect(file.height).toEqual(height);
    expect(file.format).toEqual('png');
  });

  it('check if thumb exist after resize image', async (): Promise<void> => {
    expect(await isExistingThumb(name, width, height)).toBeTrue();
  });
});

// Erase test file. Test should not run on productive system to avoid cache loss
afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(filePath);

  try {
    await fs.access(resizedImagePath);
    fs.unlink(resizedImagePath);
  } catch {
    // intentionally left blank
  }
});