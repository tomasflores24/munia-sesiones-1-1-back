import { Membership } from '../../models/membership.model';

// Obtener todas las membresías
export const getAllMembershipService = async () => {
  try {
    const memberships = await Membership.findAll();
    if (memberships.length === 0) throw new Error('No hay membresias');
    return memberships;
  } catch (error: any) {
    const messageError = error.message || 'Error en el servicio';
    throw new Error(messageError);
  }
};

export const getIdMembershipService = async (id: string) => {
  try {
    const memberships = await Membership.findByPk(id);
    if (!memberships) throw new Error(`No se encontro la membresia por el id ${id}`);
    return memberships;
  } catch (error: any) {
    const messageError = error.message || 'Error en el servicio';
    throw new Error(messageError);
  }
};

// Crear una nueva membresía
export const createMembershipService = async (data: Partial<Membership>) => {
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
