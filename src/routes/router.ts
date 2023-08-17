import express from 'express';
import { getMembership } from '../modules/membership/membership.controller';

const router = express.Router();

//Membership
router.get('/membership', getMembership);

export default router;