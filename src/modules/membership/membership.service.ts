import { Membership } from '../../models/membership.model';
import { CreateMembershipDTO } from './dto/membership';
import { handleError } from '../../common/errorResponse';
import { Op } from 'sequelize';


export const getAllMembershipsFromDB = async (
  startDate?: string,
  endDate?: string
) => {

  const whereClause: Record<string, any> = {
    isDelete: false,
  };

  if (startDate || endDate) {
    let formattedStartDate: Date | undefined;
    let formattedEndDate: Date | undefined;

    formattedStartDate = new Date(`${startDate} 00:00:00`);
    formattedEndDate = new Date(`${endDate} 23:59:59`);
  
    whereClause.createdAt = {
      [Op.between]: [formattedStartDate, formattedEndDate],
    };
  }

  const memberships = await Membership.findAll({
    where: whereClause,
  });

  if (memberships.length === 0) throw new Error('No membership found');
  return memberships;
};

export const getMembershipByIdFromDB = async (id: string) => {
  const memberships = await Membership.findByPk(id);
  if (!memberships) throw new Error(`Membership not found for id :${id}`);
  return memberships;
};

export const createNewMembershipInDB = async (body: Partial<CreateMembershipDTO>) => {
  try {
    const newMembership = await Membership.create(body);
    return newMembership;
  } catch (error) {
    handleError(error, 'Error creating membership');
  }
};

export const updateMembershipByIdInDB = async (
  id: string,
  data: Partial<Membership>
) => {
  try {
    const membershipToUpdate = await Membership.findByPk(id);
    if (!membershipToUpdate) throw new Error('Membership not found');
    const updatedMembership = await membershipToUpdate.update(data);
    return updatedMembership;
  } catch (error) {
    handleError(error, 'Error updating membership');
  }
};

export const setMembershipByIdInDB = async (id: string) => {
  const IS_DELETE = true;
  const UnsubscribeMembership = { isDelete: IS_DELETE };

  try {
    const membershipToDelete = await Membership.findByPk(id);

    if (!membershipToDelete) throw new Error('Membership not found');

    if (membershipToDelete.isDelete === IS_DELETE)
      throw new Error('The membership was already canceled');

    const updatedMembership = await membershipToDelete.update(UnsubscribeMembership);
    return updatedMembership;
  } catch (error) {
    handleError(error, 'Error deleting membership');
  }
};

export const statusMembershipByIdInDB = async (
    id: string,
    data: Partial<Membership>
  ) => {
    try {
      const membershipToUpdate = await Membership.findByPk(id);
      if (!membershipToUpdate) throw new Error('Membership not found');
      const updatedMembership = await membershipToUpdate.update(data);
      return updatedMembership;
    } catch (error) {
      handleError(error, 'Error updating membership');
    }
};

