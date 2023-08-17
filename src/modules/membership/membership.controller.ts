import { Request, Response } from 'express';
import { getMembershipData } from './membership.service';

export const getMembership = async (_req: Request, res: Response) => {
  try {
    const membershipData = await getMembershipData();
    return res.status(200).json(membershipData);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching membership data' });
  }
};

