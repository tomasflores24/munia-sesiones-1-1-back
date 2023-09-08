import { FindOptions } from 'sequelize';
import { handleError } from '../../common/errorResponse';
import { Collaborator, User } from '../../models';
import { CreateUserDTO, UpdateUserDTO } from '../user/dto/user';
import { updateUserInDB } from '../user/user.service';
import { UpdateCollaboratorDTO } from './dto';
import { uploadFileS3 } from '../s3/s3.service';
import { s3Options } from '../../config/s3.config';

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
  profileData: UpdateUserDTO
) => {
  try {
    const collaborator = await Collaborator.findByPk(collaboratorData.id);

    if (!collaborator) throw new Error('Collaborator not found');
    if (profileData.file) {
      await uploadFileS3(
        profileData.file.filename,
        s3Options.bucket as string,
        collaboratorData.UserId,
        'profile'
      );
    }
    await updateUserInDB(collaboratorData.UserId, profileData);
    await collaborator.update(collaboratorData);
    return `Collaborator ${collaboratorData.id} updated`;
  } catch (error) {
    return handleError(error, 'error updating');
  }
};

export const deleteCollaboratorInDB = async (id: string) => {
  try {
    const deleteUser = { isDelete: true };

    const collaborator: any = await Collaborator.findByPk(id);
    if (!collaborator) throw new Error('Collaborator not found');

    await updateUserInDB(collaborator.UserId, deleteUser as any);
    return `Collaborator ${id} deleted`;
  } catch (error) {
    return handleError(error, 'Error deleted user');
  }
};
