import { RequestHandler } from 'express';
import { validateAndCreate } from '../../common/validateInstance';
import { handleErrorResponse } from '../../common/errorResponse';
import {
    CreatePurchaseDTO,
    //StatusIdMembershipDTO,  
    //SearchIdMembershipDTO,
    //UpdateMembership,
  } from './dto/purchase';
  
  import {
    createPurchasepInDB,
    //setMembershipByIdInDB,
    //getAllMembershipsFromDB,
    //getMembershipByIdFromDB,
    //updateMembershipByIdInDB,
  } from './purchase.service';

export const createPurchase: RequestHandler = async (req, res) => {
    try {
      console.log("hola");
      const response = await validateAndCreate(req.body, CreatePurchaseDTO);
      console.log(response);
      const newPurchase = await createPurchasepInDB(response);
      return res.status(201).json({ newPurchase });
    } catch (error) {
      handleErrorResponse(res, error);
    }
  };