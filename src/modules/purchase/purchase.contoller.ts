import { RequestHandler } from 'express';
import { validateAndCreate } from '../../common/validateInstance';
import { handleErrorResponse } from '../../common/errorResponse';
import { CreatePurchaseDTO, SearchIdPurchaseDTO, UpdatePurchaseDTO } from './dto/purchase';
import { 
  createPurchasepInDB, 
  updatePurchaseByIdInDB, 
  getPurchaseByIdInDB,
  getPurchasesByCompanyIdAndDateRangeInDB} from './purchase.service';

export const createPurchase: RequestHandler = async (req, res) => {
  try {
    const response = await validateAndCreate(req.body, CreatePurchaseDTO);
    const newPurchase = await createPurchasepInDB(response);
    return res.status(201).json({ newPurchase });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const updatePurchase: RequestHandler = async (req, res) => {
  try {
    const data = { ...req.body, ...req.params };
    
    const { id, StatusId } = await validateAndCreate(data, UpdatePurchaseDTO);
      const updatedPurchase = await updatePurchaseByIdInDB(id, {
        StatusId,
      });
       
    return res.status(200).json({ updatedPurchase });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const getIdPurchase: RequestHandler = async (req, res) => {
  try {
    const response = await validateAndCreate(req.params, SearchIdPurchaseDTO);
    const purchase = await getPurchaseByIdInDB(response.id);
    return res.status(200).json({ purchase });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const getPurchaseByCompanyAndDate: RequestHandler = async (req, res) => {
  try {
    const { CompanyId, startDate, endDate } = req.query;

    if (!CompanyId && (!startDate || !endDate)) {
      throw new Error('Invalid request parameters');
    }

    const purchases = await getPurchasesByCompanyIdAndDateRangeInDB(
      CompanyId as string,
      startDate as string,
      endDate as string,
    );

    return res.status(200).json({ purchases });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};




