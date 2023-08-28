import express from 'express';
import { authProfile } from '../modules/auth/auth.controller';
import { useValidatorMiddelware } from '../modules/auth/middleware/authValidation';
import purchaseRouter from '../modules/purchase/purchase.router';
import MembershipsRouter from '../modules/membership/membership.router';
import countriesRouter from '../modules/countries/countries.router';

const router = express.Router();

//Membership
router.use('/membership', MembershipsRouter);

// Auth
router.post('/auth', useValidatorMiddelware, authProfile);

//Purchase
router.use('/purchase', purchaseRouter);

//Contries
router.use('/countries', countriesRouter);

export default router;
