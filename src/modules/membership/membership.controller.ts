import { Request, Response } from 'express';
import {
  getMembershipData,
  createMembership,
  updateMembership,
  deleteMembership,
} from './membership.service';

export const getMembership = async (_req: Request, res: Response) => {
  try {
    const membershipData = await getMembershipData();
    return res.status(200).json(membershipData);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching membership data' });
  }
};

export const createMembershipController = async (req: Request, res: Response) => {
  try {
    const newMembership = await createMembership(req.body);
    return res.status(201).json(newMembership);
  } catch (error) {
    return res.status(500).json({ error: 'Error creating membership' });
  }
};

export const updateMembershipController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedMembership = await updateMembership(id, req.body);
    return res.status(200).json(updatedMembership);
  } catch (error) {
    return res.status(500).json({ error: 'Error updating membership' });
  }
};

export const deleteMembershipController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteMembership(id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting membership' });
  }
};


