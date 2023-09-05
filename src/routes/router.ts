import express from 'express';
import purchaseRouter from '../modules/purchase/purchase.router';
import MembershipsRouter from '../modules/membership/membership.router';
import countriesRouter from '../modules/countries/countries.router';
import authRouter from '../modules/auth/auth.router';
import statisticsRouter from '../modules/statistics/statistics.router';
import s3Router from '../modules/s3/s3.router';
import ratingRouter from '../modules/ratings/ratings.router';
import collaboratorRouter from '../modules/collaborator/collaborator.router';
import loginRouter from '../modules/login/login.router';
import { checkJwtLogin } from '../modules/login/middleware/verifyJwtLogin';
import { validateTypeCredentials } from '../modules/login/middleware/validate';


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

// Comments(Rating)
router.use('/rating', ratingRouter);

// collaborator
router.use('/collaborator', collaboratorRouter);

// Login
router.use('/login', checkJwtLogin, validateTypeCredentials, loginRouter);

export default router;
