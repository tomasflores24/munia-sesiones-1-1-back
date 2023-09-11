import { FindOptions } from 'sequelize';
import { UpdateCompanyDTO } from './dto';
import { Company, User } from '../../../models';
import { handleError } from '../../../common/errorResponse';
import { UpdateUserDTO } from '../dto/user';
import { uploadFileS3 } from '../../s3/s3.service';
import { s3Options } from '../../../config/s3.config';
import { updateUserInDB } from '../user.service';

export const getAllCompaniesInDB = () => {
  try {
    const findOptionsAll: FindOptions = {
      include: {
        model: User,
        attributes: { exclude: ['updatedAt', 'createdAt'] },
        where: { isActive: true, isDelete: false },
      },
      attributes: { exclude: ['UserId', 'CompanyId'] },
    };
    const allCompanies = Company.findAll(findOptionsAll);
    return allCompanies;
  } catch (error) {
    return handleError(error, 'error getting');
  }
};

export const getCompanyByIdInDB = async (id: string) => {
  try {
    const findOptionsById: FindOptions = {
      include: {
        model: User,
        attributes: { exclude: ['updatedAt', 'createdAt', 'password'] },
      },
      attributes: { exclude: ['updatedAt', 'createdAt'] },
    };
    const company = await Company.findByPk(id, findOptionsById);
    if (!company) throw new Error('Company not found');
    return company;
  } catch (error) {
    return handleError(error, 'error getting by id');
  }
};

export const updateCompanyInDB = async (
  companyData: UpdateCompanyDTO,
  profileData: UpdateUserDTO
) => {
  try {
    const company = await Company.findByPk(companyData.id);

    if (!company) throw new Error('Company not found');
    if (profileData.file) {
      await uploadFileS3(
        profileData.file.filename,
        s3Options.bucket as string,
        companyData.UserId,
        'profile'
      );
    }
    await updateUserInDB(companyData.UserId, profileData);
    await company.update(companyData);
    return `Company ${companyData.id} updated`;
  } catch (error) {
    return handleError(error, 'error updating');
  }
};

export const deleteCompanyInDB = async (id: string) => {
  try {
    const deleteUser = { isDelete: true };

    const company: any = await Company.findByPk(id);
    if (!company) throw new Error('Company not found');

    await updateUserInDB(company.UserId, deleteUser as any);
    return `Company ${id} deleted`;
  } catch (error) {
    return handleError(error, 'Error deleted user');
  }
};
