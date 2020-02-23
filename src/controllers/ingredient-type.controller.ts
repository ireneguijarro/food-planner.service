import IController from 'IController';
import ingredientTypeService from '../services/ingredient-type.service';
import apiResponse from '../utilities/apiResponse';
import httpStatusCodes from 'http-status-codes';
import constants from '../constants';
import locale from '../constants/locale';
import { IngredientType } from '../entities/ingredient-type.entity';

/**
 * Gets all the ingredient-types
 *
 * @param req
 * @param res
 */
const getAll: IController = async (req, res) => {
  let allIngredientsTypes = await ingredientTypeService.getAllIngredientsType();

  if (allIngredientsTypes) {
    apiResponse.result(res, allIngredientsTypes, httpStatusCodes.OK);
  } else {
    apiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};

/**
 * Gets an ingredient-type by Id
 *
 * @param req
 * @param res
 */
const getById: IController = async (req, res) => {
  let ingredientType = await ingredientTypeService.getIngredientTypeById(
    req.params.id
  );

  if (ingredientType) {
    apiResponse.result(res, ingredientType, httpStatusCodes.OK);
  } else {
    apiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};

/**
 * Creates an ingredient-type
 *
 * @param req
 * @param res
 */
const create: IController = async (req, res) => {
  let ingredientType;
  try {
    let newIngredientType = new IngredientType();
    newIngredientType.name = req.body.name;
    ingredientType = await ingredientTypeService.createIngredientType(
      newIngredientType
    );
  } catch (e) {
    if (e.code === constants.ErrorCodes.DUPLICATE_ENTRY) {
      apiResponse.error(
        res,
        httpStatusCodes.BAD_REQUEST,
        locale.INGREDIENT_TYPE_EXISTS
      );
      return;
    }
  }
  if (ingredientType) {
    apiResponse.result(res, ingredientType, httpStatusCodes.OK);
  } else {
    apiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};

/**
 * Updates an ingredient type. Checks if the name already exists
 *
 * @param req
 * @param res
 */
const update: IController = async (req, res) => {
  let newIngredientType: IngredientType = new IngredientType();
  newIngredientType.id = req.params.id;
  newIngredientType.name = req.body.name;

  let ingredientTypeUpdated = await ingredientTypeService.updateIngredientType(
    newIngredientType
  );

  if (ingredientTypeUpdated) {
    if (ingredientTypeUpdated.raw.affectedRows === 1) {
      apiResponse.result(res, ingredientTypeUpdated, httpStatusCodes.OK);
    } else if (ingredientTypeUpdated.raw.affectedRows === 0) {
      apiResponse.error(
        res,
        httpStatusCodes.BAD_REQUEST,
        locale.INGREDIENT_TYPE_DOESNT_EXISTS
      );
    } else {
      apiResponse.error(res, httpStatusCodes.BAD_REQUEST);
    }
  } else {
    apiResponse.error(
      res,
      httpStatusCodes.BAD_REQUEST,
      locale.INGREDIENT_TYPE_EXISTS
    );
  }
};

/**
 * Deletes an ingredient type
 *
 * @param req
 * @param res
 */
const remove: IController = async (req, res) => {
  let ingredientTypeDeleted = await ingredientTypeService.removeIngredientType(
    req.params.id
  );

  if (ingredientTypeDeleted) {
    apiResponse.result(res, ingredientTypeDeleted, httpStatusCodes.OK);
  } else {
    apiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
