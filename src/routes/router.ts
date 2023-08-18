import express from 'express';
import {
  getAllMembership,
  getIdMembership,
  createMembership,
  updateMembershipController,
  deleteMembershipController,
} from '../modules/membership/membership.controller';

const router = express.Router();

router.get('/membership', getAllMembership);
router.get('/membership/:id', getIdMembership);
router.post('/membership', createMembership);
router.put('/membership/:id', updateMembershipController);
router.delete('/membership/:id', deleteMembershipController);

export default router;
