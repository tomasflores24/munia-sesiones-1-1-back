import { RequestHandler } from 'express';
import {
  StatusIdMembershipDTO,  
  CreateMembershipDTO,
  SearchIdMembershipDTO,
  UpdateMembership,
} from './dto/membership';

import {
  setMembershipByIdInDB,
  createNewMembershipInDB,
  getAllMembershipsFromDB,
  getMembershipByIdFromDB,
  updateMembershipByIdInDB,
} from './membership.service';
import { handleErrorResponse } from '../../common/errorResponse';
import { validateAndCreate } from '../../common/validateInstance';

export const getAllMembership: RequestHandler = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate && !endDate) {
      const allMemberships = await getAllMembershipsFromDB();
      return res.status(200).json({ allMemberships });
    }

    if (!startDate || !endDate) {
      throw new Error('Invalid request parameters');
    }

    const allMemberships = await getAllMembershipsFromDB(
      startDate as string,
      endDate as string
    );

    return res.status(200).json({ allMemberships });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};


export const getIdMembership: RequestHandler = async (req, res) => {
  try {
    const response = await validateAndCreate(req.params, SearchIdMembershipDTO);
    const membership = await getMembershipByIdFromDB(response.id);
    return res.status(200).json({ membership });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const createMembership: RequestHandler = async (req, res) => {
  try {
    const response = await validateAndCreate(req.body, CreateMembershipDTO);
    const newMembership = await createNewMembershipInDB(response);
    return res.status(201).json({ newMembership });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const updateMembership: RequestHandler = async (req, res) => {
  try {
    const data = { ...req.body, ...req.params };
    const { id, amount, isActive, name } = await validateAndCreate(
      data,
      UpdateMembership
    );

    const updatedMembership = await updateMembershipByIdInDB(id, {
      amount,
      isActive,
      name,
    });

    return res.status(200).json({ updatedMembership });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const deleteMembership: RequestHandler = async (req, res) => {
  try {
    const responseId = await validateAndCreate(req.params, SearchIdMembershipDTO);
    const deletedMemberShip = await setMembershipByIdInDB(responseId.id);
    return res.status(204).json({ deletedMemberShip });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const statusMembership: RequestHandler = async (req, res) => {
  try {
    const data = { ...req.body, ...req.params };
    const { id, isActive } = await validateAndCreate(
        data,
        StatusIdMembershipDTO
      );
      const statusMembership = await updateMembershipByIdInDB(id, {
        isActive,
      });
  
    return res.status(200).json({ statusMembership });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
