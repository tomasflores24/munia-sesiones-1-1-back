import express from 'express';
import purchaseRouter from '../modules/purchase/purchase.router';
import MembershipsRouter from '../modules/membership/membership.router';
import countriesRouter from '../modules/countries/countries.router';
import authRouter from '../modules/auth/auth.router';

const router = express.Router();

//Membership
router.use('/membership', MembershipsRouter);

// Auth
router.use('/auth', authRouter);

//Purchase
router.use('/purchase', purchaseRouter);

//Contries
router.use('/countries', countriesRouter);

export default router;
