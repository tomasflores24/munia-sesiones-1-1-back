import express from 'express';
import { createPurchase, updatePurchase, getIdPurchase, getPurchaseByCompanyAndDate } from "./purchase.contoller";

const purchaseRouter = express.Router();
//Purchase
purchaseRouter.post('/purchase', createPurchase);
purchaseRouter.put('/purchase/:id', updatePurchase);
purchaseRouter.get('/purchase/:id', getIdPurchase);
purchaseRouter.get('/purchase', getPurchaseByCompanyAndDate);


export default purchaseRouter;