import { CreatePurchaseDTO } from './dto/purchase';
import { Purchase_membership } from '../../models/purchase_membership.model';
import { handleError } from '../../common/errorResponse';

export const createPurchasepInDB = async (body: Partial<CreatePurchaseDTO>) => {
    try {
        const newPurchase = await Purchase_membership.create(body);
        return newPurchase;
      } catch (error) {
        handleError(error, 'Error creating membership');
      }
  };