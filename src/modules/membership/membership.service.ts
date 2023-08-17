import { Membership } from '../../models/membership.model';

// Obtener todas las membresías
export const getMembershipData = async () => {
  try {
    const memberships = await Membership.findAll();
    return memberships;
  } catch (error) {
    throw new Error('Error getting membership data');
  }
};

// Crear una nueva membresía
export const createMembership = async (data: Partial<Membership>) => {
  try {
    const newMembership = await Membership.create(data);
    return newMembership;
  } catch (error) {
    throw new Error('Error creating membership');
  }
};

// Actualizar una membresía
export const updateMembership = async (id: string, data: Partial<Membership>) => {
  try {
    const membershipToUpdate = await Membership.findByPk(id);
    if (!membershipToUpdate) {
      throw new Error('Membership not found');
    }

    const updatedMembership = await membershipToUpdate.update(data);
    return updatedMembership;
  } catch (error) {
    throw new Error('Error updating membership');
  }
};

// Eliminar una membresía
export const deleteMembership = async (id: string) => {
  try {
    const membershipToDelete = await Membership.findByPk(id);
    if (!membershipToDelete) {
      throw new Error('Membership not found');
    }

    await membershipToDelete.destroy();
  } catch (error) {
    throw new Error('Error deleting membership');
  }
};

  