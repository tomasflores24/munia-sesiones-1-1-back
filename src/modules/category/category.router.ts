import express from 'express';
import { createCategory, getAllCategory, getIdCategory, updateCategory } from './category.controller';

const categoryRouter = express.Router();
//Category
categoryRouter.get('', getAllCategory);
categoryRouter.get('/:id', getIdCategory);
categoryRouter.post('', createCategory);
categoryRouter.put('/:id', updateCategory);

export default categoryRouter;