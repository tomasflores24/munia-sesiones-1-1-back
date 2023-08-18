import { Membership } from '../../models/membership.model';
import { CreateMembershipDTO } from './dto/create-membership';

export const getAllMembershipsFromDB = async () => {
  const memberships = await Membership.findAll();
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

export const cancelMembershipByIdInDB = async (id: string) => {
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

// handleCustomError
function handleError(error: unknown, defaultMessage: string) {
  if (error instanceof Error) {
    throw new Error(error.message);
  }
  throw new Error(defaultMessage);
}
