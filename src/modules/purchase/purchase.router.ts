import express from 'express';
import { createPurchase, updatePurchase, getIdPurchase, getPurchaseByCompanyAndDate } from "./purchase.contoller";

const purchaseRouter = express.Router();
//Purchase
purchaseRouter.post('', createPurchase);
purchaseRouter.put('/:id', updatePurchase);
purchaseRouter.get('/:id', getIdPurchase);
purchaseRouter.get('', getPurchaseByCompanyAndDate);


export default purchaseRouter;