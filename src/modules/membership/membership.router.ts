import express from 'express';
import { createMembership, deleteMembership, getAllMembership, getIdMembership, statusMembership, updateMembership } from './membership.controller';

const MembershipsRouter = express.Router();

MembershipsRouter.get('', getAllMembership);
MembershipsRouter.get('/:id', getIdMembership);
MembershipsRouter.post('', createMembership);
MembershipsRouter.put('/update/:id', updateMembership);
MembershipsRouter.put('/delete/:id', deleteMembership);
MembershipsRouter.post('/status/:id', statusMembership);

export default MembershipsRouter;