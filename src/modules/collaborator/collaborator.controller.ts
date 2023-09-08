import { RequestHandler } from 'express';
import { handleErrorResponse } from '../../common/errorResponse';
import {
  deleteCollaboratorInDB,
  getAllCollaboratorInDB,
  getCollaboratorByIdInDB,
  updateCollaboratorInDB,
} from './collaborator.service';
import { deleteImage } from '../../common/deleteImage';

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

const updateCollaborator: RequestHandler = async (req, res) => {
  try {
    const userData = JSON.parse(req.body.user);
    const collaboratorData = JSON.parse(req.body.collaborator);
    const { id } = req.params;
    const file = req.file;

    const updateCollaborator = await updateCollaboratorInDB(
      { ...collaboratorData, id },
      { ...userData, file }
    );

    return res.json({ updateCollaborator });
  } catch (error) {
    handleErrorResponse(res, error);
  } finally {
    deleteImage(req.file);
  }
};

const deleteCollaborator: RequestHandler = async (req, res) => {
  try {
    const deletedCollaborator = await deleteCollaboratorInDB(req.params.id);

    return res.json({ deletedCollaborator });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export {
  getAllCollaborator,
  getCollaboratorById,
  updateCollaborator,
  deleteCollaborator,
};
