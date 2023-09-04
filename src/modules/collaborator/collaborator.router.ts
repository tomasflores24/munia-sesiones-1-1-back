import { Router } from 'express';
import {
  getAllCollaborator,
  getCollaboratorById,
  createCollaborator,
  updateCollaborator,
  deleteCollaborator,
} from './collaborator.controller';
import {
  validateCollaboratorDelete,
  validateCollaboratorId,
  validateCollaboratorUpdate,
} from './middleware/validation';

const collaboratorRouter = Router();

collaboratorRouter.get('/', getAllCollaborator);
collaboratorRouter.get('/:id', validateCollaboratorId, getCollaboratorById);

collaboratorRouter.post('/', createCollaborator);

collaboratorRouter.put(
  '/update/:id',
  validateCollaboratorUpdate,
  updateCollaborator
);
collaboratorRouter.put(
  '/delete/:id',
  validateCollaboratorDelete,
  deleteCollaborator
);

collaboratorRouter.post('/prueba', (req, res) => {
  return res.json({});
});

export default collaboratorRouter;
