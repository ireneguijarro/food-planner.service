import { IngredientType } from '../entities/ingredient-type.entity';
import { getRepository } from 'typeorm';

const getAllIngredientsType = async () => {
    return await getRepository(IngredientType).find();
}

const getIngredientTypeById = async (id: number) => {
    return await getRepository(IngredientType).findOne(id);
}

const createIngredientType = async (name: string) => {
  const newIngredientType = new IngredientType();
  newIngredientType.name = name;

  return await getRepository(IngredientType).save(newIngredientType);
};

const updateIngredientType = async (updatedIngredientType: IngredientType) => {
    if (await getRepository(IngredientType).find({name: updatedIngredientType.name})) {
        return;
    }
    return await getRepository(IngredientType).update(updatedIngredientType.id, updatedIngredientType);
}

const removeIngredientType = async (id: number) => {
    return await getRepository(IngredientType).delete(id);
}

export default {
    getAllIngredientsType,
    getIngredientTypeById,
    createIngredientType,
    updateIngredientType,
    removeIngredientType
}
