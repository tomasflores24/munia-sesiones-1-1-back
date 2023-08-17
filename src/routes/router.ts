import express from 'express';
import {
  getMembership,
  createMembershipController,
  updateMembershipController,
  deleteMembershipController,
} from '../modules/membership/membership.controller';

const router = express.Router();

router.get('/membership', getMembership);
router.post('/membership', createMembershipController);
router.put('/membership/:id', updateMembershipController);
router.delete('/membership/:id', deleteMembershipController);

export default router;
