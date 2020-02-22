import * as express from 'express';

import userAuth from './auth.route';
import ingredientType from './ingredient-type.route';

const router = express.Router();

router.use('/user/auth', userAuth);
router.use('/ingredient-type', ingredientType);

export default router;