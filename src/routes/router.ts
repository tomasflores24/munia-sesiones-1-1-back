import express from 'express';
import membershipRoutes from '../modules/membership/membership.route';

const router = express.Router();

//Membership
router.use('/membership', membershipRoutes);

export default router;
