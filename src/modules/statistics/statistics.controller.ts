import { RequestHandler } from 'express';
import { handleErrorResponse } from '../../common/errorResponse';
import { getStatisticsInDB } from './statistics.service';

export const getStatisticsByDate: RequestHandler = async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
  
      if (!startDate || !endDate) {
        throw new Error('Invalid request parameters');
      }
  
      const statistics = await getStatisticsInDB(
        startDate as string,
        endDate as string,
      );
  
      return res.status(200).json({ statistics });
    } catch (error) {
      handleErrorResponse(res, error);
    }
  };