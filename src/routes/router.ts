import express from 'express';
import purchaseRouter from '../modules/purchase/purchase.router';
import MembershipsRouter from '../modules/membership/membership.router';
import countriesRouter from '../modules/countries/countries.router';
import authRouter from '../modules/auth/auth.router';
import statisticsRouter from '../modules/statistics/statistics.router';
import s3Router from '../modules/s3/s3.router';
import collaboratorRouter from '../modules/collaborator/collaborator.router';

const router = express.Router();

//Membership
router.use('/membership', MembershipsRouter);

// Auth
router.use('/auth', authRouter);

//Purchase
router.use('/purchase', purchaseRouter);

//Contries
router.use('/countries', countriesRouter);

//Statistics
router.use('/statistics', statisticsRouter);

// s3
router.use('/s3', s3Router);

// collaborator
router.use('/collaborator', collaboratorRouter);

export default router;
