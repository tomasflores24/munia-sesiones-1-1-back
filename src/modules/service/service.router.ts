import express from 'express';
import { createService, getAllService, getIdService, updateService } from './service.controller';

const serviceRouter = express.Router();
//Service
serviceRouter.get('', getAllService);
serviceRouter.get('/:id', getIdService);
serviceRouter.post('', createService);
serviceRouter.put('/:id', updateService);

export default serviceRouter;