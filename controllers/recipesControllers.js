import * as recipesService from '../services/recipesServices.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';
import HttpError from '../helpers/HttpError.js';
import handleResult from '../helpers/handleResult.js';

const getRecipesByFilter = async (req, res, next) => {
  const { category, ingredients, area, page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;
  const filter = {};

  if (category) filter.category = category;
  if (ingredients) filter.ingredients = ingredients;
  if (area) filter.area = area;

  const fields = '-createdAt -updatedAt';
  const settings = { skip, limit };

  const result = await recipesService.listRecipes({
    filter,
    fields,
    settings,
  });

  res.json(result);
};

const getOneRecipe = async (req, res, next) => {
  const { id } = req.params;
  const result = await recipesService.getRecipeById(id);
  handleResult(result);
  res.json(result);
};

const getPopularRecipes = async (req, res, next) => {
  // Logic ???
  const fields = '-createdAt -updatedAt';
  const result = await recipesService.listRecipes({
    filter: {},
    fields,
    settings,
  });
};

const getRecipesFromUser = async (req, res, next) => {
  const { _id: owner } = req.user;
  // const owner = '64c8d958249fae54bae90bb9';
  const { page = 1, limit = 9 } = req.query;
  const skip = (page - 1) * limit;

  const filter = { owner };
  console.log(filter);
  const fields = '-createdAt -updatedAt';
  const settings = { skip, limit };

  const result = await recipesService.listRecipes({
    filter,
    fields,
    settings,
  });
  res.json(result);
};

const addRecipe = async (req, res, next) => {
  const { _id: owner } = req.user;
  const newRecipe = await recipesService.addRecipe({ ...req.body, owner });
  res.status(201).json(newRecipe);
};

const removeRecipe = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await recipesService.removeRecipe(id, owner);
  handleResult(result);
  res.json(result);
};

export default {
  getRecipesByFilter: ctrlWrapper(getRecipesByFilter),
  getOneRecipe: ctrlWrapper(getOneRecipe),
  getPopularRecipes: ctrlWrapper(getPopularRecipes),
  getRecipesFromUser: ctrlWrapper(getRecipesFromUser),
  addRecipe: ctrlWrapper(addRecipe),
  removeRecipe: ctrlWrapper(removeRecipe),
};
