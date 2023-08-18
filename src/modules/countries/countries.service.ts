import { Country } from "../../models";
import { CreateCountriesDTO } from "../countries/dto/countries";

export const createNewCountriesInDB = async (
  body: Partial<CreateCountriesDTO>
) => {
  try {
    const countries = await Country.create(body);
    return countries;
  } catch (error) {
    handleError(error, "Error creating countries");
  }
};

export const getAllCountriesFromDB = async () => {
  const countries = await Country.findAll();
  if (countries.length === 0) throw new Error("No country found");
  return countries;
};

function handleError(error: unknown, defaultMessage: string) {
  if (error instanceof Error) {
    throw new Error(error.message);
  }
  throw new Error(defaultMessage);
}
