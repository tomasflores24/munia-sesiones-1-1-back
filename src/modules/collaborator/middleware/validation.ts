import { RequestHandler } from 'express';
import { validateAndCreate } from '../../../common/validateInstance';
import {
  GetByIdCollaboratorDTO,
  UpdateCollaboratorDTO,
  deleteCollaboratorDTO,
} from '../dto';
import { handleErrorResponse } from '../../../common/errorResponse';
import { UpdateUserDTO } from '../../user/dto/user';

export const validateCollaboratorId: RequestHandler = async (req, res, next) => {
  try {
    await validateAndCreate(req.params, GetByIdCollaboratorDTO);
    next();
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const validateCollaboratorUpdate: RequestHandler = async (req, res, next) => {
  try {
    const userData = JSON.parse(req.body.user);
    const collaboratorData = JSON.parse(req.body.collaborator);
    const { id } = req.params;
    const file = req.file;

    await validateAndCreate({ ...collaboratorData, id }, UpdateCollaboratorDTO);
    await validateAndCreate({ ...userData, file }, UpdateUserDTO);

    next();
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const validateCollaboratorDelete: RequestHandler = async (req, res, next) => {
  try {
    const collaborator = req.params;
    await validateAndCreate(collaborator, deleteCollaboratorDTO);
    next();
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
