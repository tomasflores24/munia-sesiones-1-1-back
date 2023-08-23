import { RequestHandler } from 'express';
import { validateAndCreate } from '../../../common/validateInstance';
import {
  AuthCollaboratorDTO,
  AuthCompanyDTO,
  AuthProviderDTO,
  AuthTypeDTO,
} from '../dto/auth';
import { CreateUserDTO } from '../../user/dto/user';
import { handleErrorResponse } from '../../../common/errorResponse';

export const useValidatorMiddelware: RequestHandler = async (req, res, next) => {
  try {
    const { type } = await validateAndCreate(req.body.auth, AuthTypeDTO);
    await validateAndCreate(req.body.user, CreateUserDTO);

    if (type === 'collaborator') {
      await validateAndCreate(req.body.profile, AuthCollaboratorDTO);
    } else if (type === 'provider') {
      await validateAndCreate(req.body.profile, AuthProviderDTO);
    } else {
      await validateAndCreate(req.body.profile, AuthCompanyDTO);
    }
    next();
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
