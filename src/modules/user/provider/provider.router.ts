import { Router } from 'express';
import {
  deleteProvider,
  getAllProvider,
  getProviderById,
  updateProvider,
} from './provider.controller';
import {
  validateProviderDelete,
  validateProviderId,
  validateProviderUpdate,
} from './middleware/validation';
import { upload } from '../../../config/multer.config';

const providerRouter = Router();

providerRouter.get('/', getAllProvider);
providerRouter.get('/:id', validateProviderId, getProviderById);

providerRouter.put(
  '/update/:id',
  upload.single('file'),
  validateProviderUpdate,
  updateProvider
);
providerRouter.put('/delete/:id', validateProviderDelete, deleteProvider);

export default providerRouter;
