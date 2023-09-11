import { Router } from 'express';
import {
  deleteProvider,
  getAllProvider,
  getProviderById,
  updateProvider,
} from './provider.controller';
import { upload } from '../../../config/multer.config';

const providerRouter = Router();

providerRouter.get('/', getAllProvider);
providerRouter.get('/:id', getProviderById);

providerRouter.put('/update/:id', upload.single('file'), updateProvider);
providerRouter.put('/delete/:id', deleteProvider);

export default providerRouter;
