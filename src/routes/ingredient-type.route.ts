import * as express from 'express';
import ingredientTypeSchema from '../constants/schema/ingredient-type.schema';
import ingredientTypeController from '../controllers/ingredient-type.controller';

const router = express.Router();

const schemaValidator = require('express-joi-validator');


router.get('/', ingredientTypeController.getAll);
router.get('/:id', ingredientTypeController.getById);
router.post('/', schemaValidator(ingredientTypeSchema.create), ingredientTypeController.create);
router.put('/:id', schemaValidator(ingredientTypeSchema.update), ingredientTypeController.update);
router.delete('/:id', ingredientTypeController.remove);

export default router;