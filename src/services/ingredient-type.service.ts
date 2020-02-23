import { IngredientType } from '../entities/ingredient-type.entity';
import { getRepository } from 'typeorm';

/**
 * Obtains all the ingredient types
 *
 * @returns All ingredient types
 */
const getAllIngredientTypes = async () => {
  return await getRepository(IngredientType).find();
};

/**
 * Get an ingredient type due its id
 *
 * @param id Id of the ingredient-type to obtain
 * @returns One ingredient type
 */
const getIngredientTypeById = async (id: number) => {
  return await getRepository(IngredientType).findOne(id);
};

/**
 * Creates a new ingredient type
 *
 * @param newIngredientType New ingredient-type object
 * @returns Ingredient type created
 */
const createIngredientType = async (newIngredientType: IngredientType) => {
  return await getRepository(IngredientType).save(newIngredientType);
};

/**
 * Updates an ingredient type. First, checks if there is another
 * ingredient-type with its name
 *
 * @param updatedIngredientType Ingredient type to update
 * @returns Nothing if name already exists. If not, the update result
 */
const updateIngredientType = async (updatedIngredientType: IngredientType) => {
  let ingredientTypeWithUpdatedName: IngredientType[] = await getRepository(
    IngredientType
  ).find({
    name: updatedIngredientType.name,
  });

  if (ingredientTypeWithUpdatedName.length > 0) {
    return;
  } else {
    return await getRepository(IngredientType).update(
      updatedIngredientType.id,
      updatedIngredientType
    );
  }
};

/**
 * Deletes an ingredient-type
 *
 * @param id Id of the ingredient-type to delete
 * @returns Deleted ingredient-type
 */
const removeIngredientType = async (id: number) => {
  return await getRepository(IngredientType).delete(id);
};

export default {
  getAllIngredientsType: getAllIngredientTypes,
  getIngredientTypeById,
  createIngredientType,
  updateIngredientType,
  removeIngredientType,
};
