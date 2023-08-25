import { CreatePurchaseDTO, UpdatePurchaseDTO } from './dto/purchase';
import { Purchase_membership } from '../../models/purchase_membership.model';
import { handleError } from '../../common/errorResponse';
import { Op } from 'sequelize';

export const createPurchasepInDB = async (body: Partial<CreatePurchaseDTO>) => {
  try {
    const newPurchase = await Purchase_membership.create(body);
    return newPurchase;
  } catch (error) {
    handleError(error, 'Error creating purchase');
  }
};

export const updatePurchaseByIdInDB = async (
  id: string,
  data: Partial<UpdatePurchaseDTO>
) => {
  try {
    const purchaseToUpdate = await Purchase_membership.findByPk(id);
    if (!purchaseToUpdate) throw new Error('Purchase not found');
    const updatedPurchase = await purchaseToUpdate.update(data);
    return updatedPurchase;
  } catch (error) {
    handleError(error, 'Error updating purchase');
  }
};

export const getPurchaseByIdInDB = async (id: string) => {
  const purchase = await Purchase_membership.findByPk(id);
  if (!purchase) throw new Error(`Purchase not found for id :${id}`);
  return purchase;
};

export const getPurchasesByCompanyIdAndDateRangeInDB = async (
  CompanyId?: string,
  startDate?: string,
  endDate?: string
) => {

  /* where: {
    CompanyId,
    createdAt: {
      [Op.between]: [startDate, endDate],
    },
  }
 */
  const whereClause: Record<string, any> = {};

  if (CompanyId) {
    whereClause.CompanyId = CompanyId;
  }
  
  if (startDate || endDate) {
    let formattedStartDate: Date | undefined;
    let formattedEndDate: Date | undefined;

    formattedStartDate = new Date(`${startDate} 00:00:00`);
    formattedEndDate = new Date(`${endDate} 23:59:59`);
  
    whereClause.createdAt = {
      [Op.between]: [formattedStartDate, formattedEndDate],
    };
  }

  const purchases = await Purchase_membership.findAll({
    where: whereClause,
  });

  return purchases;
};
