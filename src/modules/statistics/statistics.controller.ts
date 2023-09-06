import { RequestHandler } from 'express';
import { handleErrorResponse } from '../../common/errorResponse';
import { getAllUserInDB, getServicesInDB, getGendersInDB, getAgesInDB, getGeneralInDB } from './statistics.service';

export const getStatisticsByUser: RequestHandler = async (_req, res) => {
  try {
    const statistics = await getAllUserInDB();
    return res.status(200).json({ statistics });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const getStatisticsByGenders: RequestHandler = async (req, res) => {
  try {
    const { CompanyId, CategoryId, ServiceId ,startDate, endDate } = req.query;

    if (!CompanyId || !CategoryId || !startDate || !endDate) {
      throw new Error('Invalid request parameters');
    }

    const statistics = await getGendersInDB(
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

export const getStatisticsByAges: RequestHandler = async (req, res) => {
  try {
    const { CompanyId, CategoryId, ServiceId ,startDate, endDate } = req.query;

    if (!CompanyId || !CategoryId || !startDate || !endDate) {
      throw new Error('Invalid request parameters');
    }

    const statistics = await getAgesInDB(
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

export const getStatisticsByServices: RequestHandler = async (req, res) => {
  try {
    const { CompanyId, CategoryId ,startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      throw new Error('Invalid request parameters');
    }

    const statistics = await getServicesInDB(
      startDate as string,
      endDate as string,
      CategoryId as string,
      CompanyId as string,
    );

    return res.status(200).json({ statistics });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const getStatisticsGeneral: RequestHandler = async (req, res) => {
  try {
    const { CompanyId, startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      throw new Error('Invalid request parameters');
    }

    const statistics = await getGeneralInDB(
      startDate as string,
      endDate as string,
      CompanyId as string,
    );

    return res.status(200).json({ statistics });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};


