import express from 'express';
import recipesControllers from '../controllers/recipesControllers.js';
import isEmptyBody from '../middlewares/isEmptyBody.js';
import validateBody from '../decorators/validateBody.js';
import isValidId from '../middlewares/isValidId.js';
import authenticate from '../middlewares/authenticate.js';
import upload from '../middlewares/upload.js';

const recipesRouter = express.Router();

recipesRouter.get('/', recipesControllers.getRecipesByFilter);

recipesRouter.post(
  '/',
  // authenticate,
  // isEmptyBody,
  // validateBody, // To do schema
  upload.single('thumb'),
  recipesControllers.addRecipe
);

recipesRouter.delete('/', authenticate, recipesControllers.removeRecipe);

// recipesRouter.get('/favorites', recipesControllers.removeRecipe);

recipesRouter.get('/popular', recipesControllers.getPopularRecipes);

// Not tested
recipesRouter.get(
  '/myrecipes',
  // authenticate,
  recipesControllers.getRecipesFromUser
);

// Not tested
recipesRouter.get(
  '/myrecipes/favorites',
  // authenticate,
  recipesControllers.getMyFavoriteRecipe
);

recipesRouter.post(
  '/favorites',
  // authenticate,
  isEmptyBody,
  // validateBody, // To do schema
  recipesControllers.addFavoriteRecipe
);

recipesRouter.delete(
  '/favorites',
  // authenticate,
  isEmptyBody,
  // validateBody, // To do schema
  recipesControllers.removeFavoriteRecipe
);

recipesRouter.get('/favorites', recipesControllers.getAllFavoriteRecipe);

recipesRouter.get('/:id', isValidId, recipesControllers.getOneRecipe);

export default recipesRouter;
