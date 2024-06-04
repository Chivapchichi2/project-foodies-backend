import express from 'express';
import recipesControllers from '../controllers/recipesControllers.js';
import isEmptyBody from '../middlewares/isEmptyBody.js';
import validateBody from '../decorators/validateBody.js';
import isValidId from '../middlewares/isValidId.js';
import authenticate from '../middlewares/authenticate.js';

const recipesRouter = express.Router();

export default recipesRouter;
