import express from 'express';
import { getAllUserTypes } from '../modules/userType/userType.controller';
import {
  getAllMembership,
  getIdMembership,
  createMembership,
  updateMembershipController,
  deleteMembershipController,
  statusMembershipController,
} from '../modules/membership/membership.controller';
import { authProfile } from '../modules/auth/auth.controller';
import { useValidatorMiddelware } from '../modules/auth/middleware/authValidation';
import { createPurchase } from '../modules/purchase/purchase.contoller';

const router = express.Router();

//UserType
router.get('/usertypes', getAllUserTypes);
//Membership
router.get('/memberships', getAllMembership);
router.get('/membership/:id', getIdMembership);
router.post('/membership', createMembership);
router.put('/membership/update/:id', updateMembershipController);
router.put('/membership/delete/:id', deleteMembershipController);
router.post('/membership/status/:id', statusMembershipController);

// Auth
router.post('/auth', useValidatorMiddelware, authProfile);

//Purchase
router.post('/purchase', createPurchase);

export default router;
