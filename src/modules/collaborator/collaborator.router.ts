import { Router } from 'express';
import {
  getAllCollaborator,
  getCollaboratorById,
  updateCollaborator,
  deleteCollaborator,
} from './collaborator.controller';
import {
  validateCollaboratorDelete,
  validateCollaboratorId,
  validateCollaboratorUpdate,
} from './middleware/validation';
import { upload } from '../../config/multer.config';

const collaboratorRouter = Router();

collaboratorRouter.get('/', getAllCollaborator);
collaboratorRouter.get('/:id', validateCollaboratorId, getCollaboratorById);

collaboratorRouter.put(
  '/update/:id',
  upload.single('file'),
  validateCollaboratorUpdate,
  updateCollaborator
);
collaboratorRouter.put(
  '/delete/:id',
  validateCollaboratorDelete,
  deleteCollaborator
);

export default collaboratorRouter;
