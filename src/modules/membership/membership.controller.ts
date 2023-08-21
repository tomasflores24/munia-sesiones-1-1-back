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

export const getAllMembership: RequestHandler = async (_req, res) => {
  try {
    const allMemberships = await getAllMembershipsFromDB();
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

export const updateMembershipController: RequestHandler = async (req, res) => {
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

export const deleteMembershipController: RequestHandler = async (req, res) => {
  try {
    const responseId = await validateAndCreate(req.params, SearchIdMembershipDTO);
    const deletedMemberShip = await setMembershipByIdInDB(responseId.id);
    return res.status(204).json({ deletedMemberShip });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const statusMembershipController: RequestHandler = async (req, res) => {
  try {
    const data = { ...req.body, ...req.params };
    const { id, isActive } = await validateAndCreate(
        data,
        StatusIdMembershipDTO
      );
      const updatedMembership = await updateMembershipByIdInDB(id, {
        isActive,
      });
  
    return res.status(200).json({ updatedMembership });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
