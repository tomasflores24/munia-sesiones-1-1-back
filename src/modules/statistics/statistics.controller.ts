import { RequestHandler } from 'express';
import { handleErrorResponse } from '../../common/errorResponse';
import { getDemographicInDB, getAllUserInDB } from './statistics.service';

export const getStatisticsByUser: RequestHandler = async (_req, res) => {
  try {
    const statistics = await getAllUserInDB();
    return res.status(200).json({ statistics });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const getStatisticsByDemographic: RequestHandler = async (req, res) => {
  try {
    const { CompanyId, CategoryId, ServiceId ,startDate, endDate } = req.query;

    if (!CompanyId || !CategoryId || !startDate || !endDate) {
      throw new Error('Invalid request parameters');
    }

    const statistics = await getDemographicInDB(
      startDate as string,
      endDate as string,
      CategoryId as string,
      ServiceId as string,
      CompanyId as string,
    );

    return res.status(200).json({ statistics });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};


