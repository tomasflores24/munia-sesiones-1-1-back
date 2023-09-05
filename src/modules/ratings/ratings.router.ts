//Comments
import express from 'express';
import {createRating, getRatingById,  getRatings, updateRating, deleteRating} from "./ratings.controller"

const ratingRouter = express.Router();

ratingRouter.get('/', getRatings);
ratingRouter.post('/', createRating);
ratingRouter.get('/:id', getRatingById);
ratingRouter.put('/:id', updateRating);
ratingRouter.delete('/:id', deleteRating); 

export default ratingRouter 
