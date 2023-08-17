import { RequestHandler } from 'express';
import { MembershipDTO } from './dto/create-membership';
import { validationDataMembership } from './utils';
import {
  getAllMembershipService,
  createMembershipService,
  updateMembership,
  deleteMembership,
  getIdMembershipService,
} from './membership.service';

export const getAllMembership: RequestHandler = async (_req, res) => {
  try {
    const allMemberships = await getAllMembershipService();
    return res.status(200).json({ allMemberships });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const getIdMembership: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const membership = await getIdMembershipService(id);
    return res.status(200).json({ membership });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};
export const createMembership: RequestHandler = async (req, res) => {
  try {
    const { name, isActive, isDelete, amount }: MembershipDTO = req.body;
    validationDataMembership({ name, isActive, isDelete, amount });
    const newMembership = await createMembershipService({
      name,
      isActive,
      isDelete,
      amount,
    });
    return res.status(201).json({ newMembership });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const updateMembershipController: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMembership = await updateMembership(id, req.body);
    return res.status(200).json(updatedMembership);
  } catch (error) {
    return res.status(500).json({ error: 'Error updating membership' });
  }
};

export const deleteMembershipController: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteMembership(id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting membership' });
  }
};
