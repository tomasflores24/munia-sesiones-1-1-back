import { Rating } from '../../models/rating.model';
import { CreateRatingDTO } from './dto/rating';
import { handleError } from '../../common/errorResponse';

export const getRatingByIdInDB = async (id: string) => {
    console.log("ID SERVICE",id)
    try{
        const ratingDb = await Rating.findByPk(id);
        if(!ratingDb) throw new Error(`Rating not found for id: ${id}`);
        return ratingDb
    }catch(error){
        handleError(error, 'Error al traer ratings');
    }
};

export const createRatingInDB = async (body: CreateRatingDTO) => {
    try {
      const newMRating = await Rating.create(body as any);
      return newMRating;
    } catch (error) {
      handleError(error, 'Error al crear un Rating');
    }
};

export const getAllRatings = async () => {
    try {
        const allRatings = await Rating.findAll({
            where:{
                isActive : true
            }
        });
        if(allRatings.length === 0) {
            throw new Error('No hay ratings disponibles')
        }
        return allRatings
    } catch (error) {
        handleError(error, "Ocurrió un error al obtener los comentarios")
    }
};


export const deleteRatingByIdInDB = async (id: string) => {
    const IS_ACTIVE = false;
    const ratingDeleted = { isActive: IS_ACTIVE };
  
    try {
      const ratingToDelete = await Rating.findByPk(id);
  
      if (!ratingToDelete) throw new Error('Rating not found');
  
      if (ratingToDelete.isActive === IS_ACTIVE)
        throw new Error('The rating was already canceled');

      //Actualiza la propiedad "isActive" en false
      const updatedRating = await ratingToDelete.update(ratingDeleted);
      return updatedRating;
    } catch (error) {
      handleError(error, 'Error deleting rating');
    }
  };



  export const updateRatingByIdInDB = async (
    id: string,
    data: Partial<Rating>
  ) => {
    try {
      const ratingToUpdate = await Rating.findByPk(id);
      if (!ratingToUpdate) throw new Error('Rating not found');
      const updatedRating = await ratingToUpdate.update(data);
      return updatedRating;
    } catch (error) {
      handleError(error, 'Error updating rating');
    }
  };