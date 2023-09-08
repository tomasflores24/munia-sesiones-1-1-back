import { Router } from 'express';
import {
  deleteCompany,
  getAllCompany,
  getCompanyById,
  updateCompany,
} from './company.controller';
import {
  validateCompanyDelete,
  validateCompanyId,
  validateCompanyUpdate,
} from './middleware/validation';
import { upload } from '../../config/multer.config';

const companyRouter = Router();

companyRouter.get('/', getAllCompany);
companyRouter.get('/:id', validateCompanyId, getCompanyById);

companyRouter.put(
  '/update/:id',
  upload.single('file'),
  validateCompanyUpdate,
  updateCompany
);
companyRouter.put('/delete/:id', validateCompanyDelete, deleteCompany);

export default companyRouter;
