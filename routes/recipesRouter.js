import express from 'express';
import recipesControllers from '../controllers/recipesControllers.js';
import isEmptyBody from '../middlewares/isEmptyBody.js';
import validateBody from '../decorators/validateBody.js';
import isValidId from '../middlewares/isValidId.js';
import authenticate from '../middlewares/authenticate.js';

const recipesRouter = express.Router();

recipesRouter.get('/', recipesControllers.getRecipesByFilter);

recipesRouter.post(
  '/',
  authenticate,
  isEmptyBody,
  validateBody,
  recipesControllers.getRecipesByFilter
);

recipesRouter.get('/popular', recipesControllers.getPopularRecipes);

// Not tested
recipesRouter.get(
  '/myrecipes',
  authenticate,
  recipesControllers.getRecipesFromUser
);

recipesRouter.get('/:id', isValidId, recipesControllers.getOneRecipe);

export default recipesRouter;
