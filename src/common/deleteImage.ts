import fs from 'fs';

export const DIRECTORY_UPLOADS = 'src/assets/uploads';

export const deleteImage = (file: any) => {
  if (!file) return 0;
  const filename = file.filename;

  const pathDelete = `${DIRECTORY_UPLOADS}/${filename}`;

  fs.unlink(pathDelete, (err) => {
    if (err) console.error(`Error deleting image: ${err}`);
    else console.log(`Image deleted: ${filename}`);
  });
};