import { RequestHandler } from 'express';
import {handleErrorResponse} from "../../common/errorResponse"
import { validateAndCreate } from '../../common/validateInstance';
import { CreateRatingDTO, SearchIdRatingDTO, UpdateRatingDTO} from './dto/rating';
import {createRatingInDB,  getAllRatings,  getRatingByIdInDB, deleteRatingByIdInDB, updateRatingByIdInDB  } from './ratings.service'


export const createRating: RequestHandler = async (req, res) => {
    try {
        const response = await validateAndCreate(req.body, CreateRatingDTO)
        const newRating = await createRatingInDB(response)
        return res.status(201).json({newRating})
    } catch (error) {
        handleErrorResponse(res, error)
    }
};

export const getRatings: RequestHandler = async (_req, res) => {
    try {
        const allRatings = await getAllRatings();
        return res.status(200).json(allRatings)
    } catch (error) {
        handleErrorResponse(res, error)
    }
};

export const getRatingById: RequestHandler = async (req, res) => {
    const {id} = req.params
    try {
        const allRatings = await getRatingByIdInDB(id);
        return res.status(200).json(allRatings)
    } catch (error) {
        handleErrorResponse(res, error)
    }
};


export const updateRating: RequestHandler = async (req, res) => {
    try {
        const id = req.params.id.toString();

        const { isActive, comentary, rating} = await validateAndCreate(req.body, UpdateRatingDTO);

        const updateRating = await updateRatingByIdInDB(id, {
            comentary, rating, isActive
        })
        return res.status(200).json({updateRating: updateRating})
    } catch (error) {
        handleErrorResponse(res, error)
    }
}; 

export const deleteRating: RequestHandler = async (req, res) => {
    try {
        const responseId = await validateAndCreate(req.params, SearchIdRatingDTO);
        const deleteRating = await deleteRatingByIdInDB(responseId.id)
        return res.status(200).json({deleteRating});
    } catch (error) {
        handleErrorResponse(res, error)
    }
}; 