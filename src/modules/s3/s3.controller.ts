import { RequestHandler } from 'express';
import { getFileS3, getFilesS3, uploadFileS3 } from './s3.service';
import { handleErrorResponse } from '../../common/errorResponse';
import { s3Options } from '../../config/s3.config';
import { deleteImage } from '../../common/deleteImage';

export const uploadFile: RequestHandler = async (req, res) => {
  try {
    const file = req.file;
    const { folder, userId } = req.params;
    const bucket = s3Options.bucket as string;

    if (!file) throw new Error('Upload file not found');

    const user = await uploadFileS3(file.filename, bucket, userId, folder);
    return res.json({ message: `Update user ${userId}`, user });
  } catch (error) {
    handleErrorResponse(res, error);
  } finally {
    deleteImage(req.file);
  }
};

export const getFiles: RequestHandler = async (_req, res) => {
  try {
    const files = await getFilesS3();
    return res.json({ files });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const getFileCON: RequestHandler = async (req, res) => {
  try {
    const name = req.params.filename;
    const folder = req.body.folder;
    const result = await getFileS3(name, folder);

    return res.json({ file: result.$metadata });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
