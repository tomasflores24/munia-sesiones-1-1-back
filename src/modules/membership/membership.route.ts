import express from 'express';
import { getMembership } from './membership.controller';

const membershipRoutes = express.Router();

membershipRoutes.get('/', getMembership);

export default membershipRoutes;