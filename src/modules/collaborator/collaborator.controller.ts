import { RequestHandler } from 'express';
import { handleErrorResponse } from '../../common/errorResponse';
import {
  deleteCollaboratorInDB,
  getAllCollaboratorInDB,
  getCollaboratorByIdInDB,
  updateCollaboratorInDB,
} from './collaborator.service';

const getAllCollaborator: RequestHandler = async (_req, res) => {
  try {
    const allCollaborators = await getAllCollaboratorInDB();
    return res.json({ allCollaborators });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const getCollaboratorById: RequestHandler = async (req, res) => {
  try {
    const collaborator = await getCollaboratorByIdInDB(req.params.id);
    return res.json({ collaborator });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const createCollaborator: RequestHandler = (_req, res) => {
  return res.json({ message: 'Collaborator create' });
};

const updateCollaborator: RequestHandler = async (req, res) => {
  try {
    const collaboratorData = {
      ...req.body.collaborator,
      ...req.params,
    };
    const profileData = req.body.user;

    const updateCollaborator = await updateCollaboratorInDB(
      collaboratorData,
      profileData
    );

    return res.json({ updateCollaborator });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const deleteCollaborator: RequestHandler = async (req, res) => {
  try {
    const collaboratorData = { ...req.body.collaborator, ...req.params };
    const deletedCollaborator = await deleteCollaboratorInDB(collaboratorData);

    return res.json({ deletedCollaborator });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export {
  getAllCollaborator,
  getCollaboratorById,
  createCollaborator,
  updateCollaborator,
  deleteCollaborator,
};
