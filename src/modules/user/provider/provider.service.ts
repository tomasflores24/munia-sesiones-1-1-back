import { FindOptions } from 'sequelize';
import { Provider, User } from '../../../models';
import { handleError } from '../../../common/errorResponse';
import { UpdateUserDTO } from '../dto/user';
import { uploadFileS3 } from '../../s3/s3.service';
import { s3Options } from '../../../config/s3.config';
import { updateUserInDB } from '../user.service';

export const getAllProviderInDB = () => {
  try {
    const findOptionsAll: FindOptions = {
      include: { model: User, attributes: { exclude: ['updatedAt', 'createdAt'] } },
      attributes: { exclude: ['UserId'] },
    };
    const allProvider = Provider.findAll(findOptionsAll);
    return allProvider;
  } catch (error) {
    return handleError(error, 'error getting');
  }
};

export const getProviderByIdInDB = async (id: string) => {
  try {
    const findOptionsById: FindOptions = {
      include: { model: User, attributes: { exclude: ['updatedAt', 'createdAt'] } },
      attributes: { exclude: ['updatedAt', 'createdAt'] },
    };
    const provider = await Provider.findByPk(id, findOptionsById);
    if (!provider) throw new Error('Provider not found');
    return provider;
  } catch (error) {
    return handleError(error, 'error getting by id');
  }
};

export const updateProviderInDB = async (
  providerData: any,
  profileData: UpdateUserDTO
) => {
  try {
    const provider = await Provider.findByPk(providerData.id);

    if (!provider) throw new Error('Provider not found');
    if (profileData.file) {
      await uploadFileS3(
        profileData.file.filename,
        s3Options.bucket as string,
        providerData.UserId,
        'profile'
      );
    }
    await updateUserInDB(providerData.UserId, profileData);
    await provider.update(providerData);
    return `Provider ${providerData.id} updated`;
  } catch (error) {
    return handleError(error, 'error updating');
  }
};

export const deleteProviderInDB = async (id: string) => {
  try {
    const deleteUser = { isDelete: true };

    const provider: any = await Provider.findByPk(id);
    if (!provider) throw new Error('Provider not found');

    await updateUserInDB(provider.UserId, deleteUser as any);
    return `Provider ${id} deleted`;
  } catch (error) {
    return handleError(error, 'Error deleted user');
  }
};
