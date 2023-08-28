import { RequestHandler } from "express";
import { handleErrorResponse } from "../../common/errorResponse";
import { createNewCountriesInDB, getAllCountriesFromDB } from "./countries.service";

export const createCountries: RequestHandler = async (_req, res) => {
  try {
    const newCountries = await createNewCountriesInDB();
    return res.status(201).json({ newCountries });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const getAllCountries: RequestHandler = async (_req, res) => {
  try {
    const allCountries = await getAllCountriesFromDB();
    return res.status(200).json({ allCountries });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
