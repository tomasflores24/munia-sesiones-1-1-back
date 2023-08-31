import { Router } from 'express';
import { getFileCON, getFiles, uploadFile } from './s3.controller';
import { upload } from '../../config/multer.config';

const s3Router = Router();

s3Router.post('/upload/:folder/:userId', upload.single('file'), uploadFile);
s3Router.get('/files', getFiles);
s3Router.get('/files/:filename', getFileCON);

export default s3Router;
