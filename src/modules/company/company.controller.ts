import { RequestHandler } from 'express';
import { handleErrorResponse } from '../../common/errorResponse';
import {
  deleteCompanyInDB,
  getAllCompaniesInDB,
  getCompanyByIdInDB,
  updateCompanyInDB,
} from './company.service';
import { deleteImage } from '../../common/deleteImage';

const getAllCompany: RequestHandler = async (_req, res) => {
  try {
    const allCompanies = await getAllCompaniesInDB();
    return res.json({ allCompanies });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const getCompanyById: RequestHandler = async (req, res) => {
  try {
    const company = await getCompanyByIdInDB(req.params.id);
    return res.json({ company });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const updateCompany: RequestHandler = async (req, res) => {
  try {
    const userData = JSON.parse(req.body.user);
    const companyData = JSON.parse(req.body.company);
    const { id } = req.params;
    const file = req.file;

    const updateCompany = await updateCompanyInDB(
      { ...companyData, id },
      { ...userData, file }
    );

    return res.json({ updateCompany });
  } catch (error) {
    handleErrorResponse(res, error);
  } finally {
    deleteImage(req.file);
  }
};

const deleteCompany: RequestHandler = async (req, res) => {
  try {
    const deletedCompany = await deleteCompanyInDB(req.params.id);

    return res.json({ deletedCompany });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export { getAllCompany, getCompanyById, updateCompany, deleteCompany };
