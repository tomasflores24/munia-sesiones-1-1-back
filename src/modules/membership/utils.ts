import { MembershipDTO } from './dto/create-membership';

export const validationDataMembership = ({
  name,
  isActive,
  isDelete,
  amount,
}: MembershipDTO) => {
  if (
    typeof name !== 'string' ||
    typeof isActive !== 'boolean' ||
    typeof isDelete !== 'boolean' ||
    typeof amount !== 'number'
  ) {
    throw new Error('Los datos que enviaste son invalidos');
  }
};
