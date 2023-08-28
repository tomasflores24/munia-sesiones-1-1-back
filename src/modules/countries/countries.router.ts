import express from 'express';
import { getAllCountries, createCountries } from "./countries.controller";

const countriesRouter = express.Router();
//Countries
countriesRouter.get('', getAllCountries);
countriesRouter.post('', createCountries);


export default countriesRouter;