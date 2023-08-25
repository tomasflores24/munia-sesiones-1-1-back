import express from 'express';
import { authProfile } from '../modules/auth/auth.controller';
import { useValidatorMiddelware } from '../modules/auth/middleware/authValidation';
import purchaseRouter from '../modules/purchase/purchase.router';
import MembershipsRouter from '../modules/membership/membership.router';

const router = express.Router();

//Membership
router.use('/membership', MembershipsRouter);

// Auth
router.post('/auth', useValidatorMiddelware, authProfile);

//Purchase
router.use('/purchase', purchaseRouter);

export default router;
