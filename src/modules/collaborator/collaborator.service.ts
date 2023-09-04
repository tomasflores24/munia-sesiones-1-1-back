import { FindOptions } from 'sequelize';
import { handleError } from '../../common/errorResponse';
import { Collaborator, User } from '../../models';
import { CreateUserDTO } from '../user/dto/user';
import { updateUserInDB } from '../user/user.service';
import { UpdateCollaboratorDTO } from './dto';

export const getAllCollaboratorInDB = () => {
  try {
    const findOptionsAll: FindOptions = {
      include: { model: User, attributes: { exclude: ['updatedAt', 'createdAt'] } },
      attributes: { exclude: ['UserId', 'CompanyId'] },
    };
    const allCollaborators = Collaborator.findAll(findOptionsAll);
    return allCollaborators;
  } catch (error) {
    return handleError(error, 'error getting');
  }
};

export const getCollaboratorByIdInDB = async (id: string) => {
  try {
    const findOptionsById: FindOptions = {
      include: { model: User, attributes: { exclude: ['updatedAt', 'createdAt'] } },
      attributes: { exclude: ['updatedAt', 'createdAt'] },
    };
    const collaborator = await Collaborator.findByPk(id, findOptionsById);
    if (!collaborator) throw new Error('Collaborator not found');
    return collaborator;
  } catch (error) {
    return handleError(error, 'error getting by id');
  }
};

export const updateCollaboratorInDB = async (
  collaboratorData: UpdateCollaboratorDTO,
  profileData: CreateUserDTO
) => {
  try {
    const collaborator = await Collaborator.findByPk(collaboratorData.id);

    if (!collaborator) throw new Error('Collaborator not found');
    await updateUserInDB(collaboratorData.UserId, profileData);
    await collaborator.update(collaboratorData);
    return `Collaborator ${collaboratorData.id} updated`;
  } catch (error) {
    return handleError(error, 'error updating');
  }
};

export const deleteCollaboratorInDB = async (collaboratorData: any) => {
  try {
    const deleteUser = { isDelete: true };

    const collaborator = await Collaborator.findByPk(collaboratorData.id);
    if (!collaborator) throw new Error('Collaborator not found');

    await updateUserInDB(collaboratorData.UserId, deleteUser as any);
    await collaborator.update(collaboratorData);
    return `Collaborator ${collaboratorData.id} deleted`;
  } catch (error) {
    return handleError(error, 'Error deleted user');
  }
};
