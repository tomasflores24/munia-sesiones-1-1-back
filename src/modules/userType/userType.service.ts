import { User_type } from '../../models';

export const getAllUserTypeInDB = async () => {
  const memberships = await User_type.findAll();
  if (memberships.length === 0) throw new Error('No user types found');
  return memberships;
};
