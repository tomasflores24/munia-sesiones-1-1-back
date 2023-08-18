import { RequestHandler, Response } from 'express';
import { MembershipDTO, MembershipIdDTO } from './dto/create-membership';
// import { validateAndCreate } from '../../utils';
import { ValidatorOptions, validate } from 'class-validator';

import {
  cancelMembershipByIdInDB,
  createNewMembershipInDB,
  getAllMembershipsFromDB,
  getMembershipByIdFromDB,
  updateMembershipByIdInDB,
} from './membership.service';

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
    const response = await validateAndCreate(req.params, MembershipIdDTO);
    const membership = await getMembershipByIdFromDB(response.id);
    return res.status(200).json({ membership });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const createMembership: RequestHandler = async (req, res) => {
  try {
    const response = await validateAndCreate(req.body, MembershipDTO);
    const newMembership = await createNewMembershipInDB(response);
    return res.status(201).json({ newMembership });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const updateMembershipController: RequestHandler = async (req, res) => {
  try {
    const responseUpdate = await validateAndCreate(req.body, MembershipDTO);
    const responseId = await validateAndCreate(req.params, MembershipIdDTO);
    const updatedMembership = await updateMembershipByIdInDB(
      responseId.id,
      responseUpdate
    );

    return res.status(200).json({ updatedMembership });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const deleteMembershipController: RequestHandler = async (req, res) => {
  try {
    const responseId = await validateAndCreate(req.params, MembershipIdDTO);
    const deletedMemberShip = await cancelMembershipByIdInDB(responseId.id);
    return res.status(204).json({ deletedMemberShip });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

// handleErrorResponse
const handleErrorResponse = (res: Response, error: unknown) => {
  if (error instanceof Error) {
    return res.status(500).json({ error: error.message });
  } else {
    return res.status(500).json({ error: 'An unknown error occurred.' });
  }
};

const ValidatorOptions: ValidatorOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
  validationError: {
    target: false,
    value: false,
  },
};

export async function validateAndCreate<T>(
  body: any,
  ClassType: new () => T
): Promise<T> {
  const instance: any = new ClassType();
  Object.assign(instance, body);
  const arrayErrors = await validate(instance, ValidatorOptions);
  if (arrayErrors.length === 0) return instance;

  let keyError: string = '';
  arrayErrors.forEach((e) => {
    const obj = e.constraints;
    for (const key in obj) {
      keyError = obj[key];
      break;
    }
  });

  throw new Error(keyError || 'Datos invalidos');
}
