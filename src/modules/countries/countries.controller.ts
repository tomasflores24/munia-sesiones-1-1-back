import { validateAndCreate } from "../../common/validateInstance";
import { handleErrorResponse } from "../../common/errorResponse";
import { CreateCountriesDTO } from "./dto/countries";
import { RequestHandler } from "express";
import { Countries } from "../../assets/countries";
import {
  createNewCountriesInDB,
  getAllCountriesFromDB,
} from "./countries.service";

export const createCountries: RequestHandler = async (_req, res) => {
  try {
    const countries = Countries.map((country) => {
      return {
        name: country.name,
        areaCode: country.areaCode,
        abv: country.abv,
        latlong: country.latlong,
        flag: country.flag,
      };
    });
    const response = await validateAndCreate(countries, CreateCountriesDTO);
    const newCountries = await createNewCountriesInDB(response);
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
