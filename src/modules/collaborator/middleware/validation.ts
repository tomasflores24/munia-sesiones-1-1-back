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
    const collaborator = { ...req.body.collaborator, ...req.params };
    await validateAndCreate(collaborator, UpdateCollaboratorDTO);
    await validateAndCreate(req.body.user, UpdateUserDTO);
    next();
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const validateCollaboratorDelete: RequestHandler = async (req, res, next) => {
  try {
    const collaborator = { ...req.body.collaborator, ...req.params };
    await validateAndCreate(collaborator, deleteCollaboratorDTO);
    next();
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
