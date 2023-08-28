import { Country } from "../../models";
import { Countries } from "../../assets/countries";
import { handleError } from '../../common/errorResponse';


export const createNewCountriesInDB = async () => {
  try {
    for (const element of Countries) {
      await Country.findOrCreate({
        where: { name: element.name },
        defaults: { area_code:element.areaCode }
      });
    }
    return "Countries created successfully";
  } catch (error) {
    handleError(error, 'Countries were not successfully created');
  }
};

export const getAllCountriesFromDB = async () => {
  const countries = await Country.findAll();
  if (countries.length === 0) throw new Error("No countries found");
  return countries;
};

