import { promises as fs } from 'fs';
import sharp from 'sharp';
const checkInFull = async (image: string): Promise<boolean> => {
  const full = await fs.readdir('./full');
  let i = 0;
  for (i = 0; i < full.length; i++) {
    if (full[i] == image || full[i] == image + '.jpg') {
      return true;
    }
  }
  return false;
};
const checkInThumb = async (image: string): Promise<boolean> => {
  const thumb = await fs.readdir('./thumb');
  let i = 0;
  for (i = 0; i < thumb.length; i++) {
    if (thumb[i] == image || thumb[i] == image + '.jpg') {
      return true;
    }
  }
  return false;
};
const transform = async (
  name: string,
  width: number,
  height: number,
  name2: string
): Promise<void> => {
  await sharp('./full/' + name + '.jpg')
    .resize(width, height)
    .toFile('./thumb/' + name2 + '.jpg');
};
export default {
  checkInFull,
  checkInThumb,
  transform,
};
