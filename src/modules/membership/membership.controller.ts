import { Request, Response } from 'express';
//import { Membership } from '../../models/membership.model';


export const getMembership = async (_req: Request, res: Response) => {
  try {
    return res.status(200).send('ok');
  } catch (error) {
    return res.status(500).json({ error: 'Error' });
  }
};