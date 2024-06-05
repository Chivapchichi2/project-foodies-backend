import * as recipesService from '../services/recipesServices.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';
import HttpError from '../helpers/HttpError.js';
import handleResult from '../helpers/handleResult.js';
import cloudinary from '../helpers/cloudinary.js';
import fs from 'fs/promises';

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
  // const { _id: owner } = req.user;
  const owner = '64c8d958249fae54bae90bb8';
  const { path } = req.file;

  try {
    const { url: thumb } = await cloudinary.uploader.upload(path, {
      folder: 'recipes',
    });

    const newRecipe = await recipesService.addRecipe({
      ...req.body,
      owner,
      thumb,
    });

    res.status(201).json(newRecipe);
  } catch (err) {
    throw HttpError(400, err.message);
  } finally {
    await fs.unlink(path);
  }
};

const removeRecipe = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  const result = await recipesService.removeRecipe(id, owner);
  handleResult(result);

  res.json(result);
};

const addFavoriteRecipe = async (req, res, next) => {
  // const { _id: user } = req.user;
  const user = '64c8d958249fae54bae90bb8';

  const { recipe } = req.body;

  const result = await recipesService.addFavoriteRecipe(recipe, user);
  handleResult(result);

  res.json(result);
};

const removeFavoriteRecipe = async (req, res, next) => {
  // const { _id: user } = req.user;
  const user = '64c8d958249fae54bae90bb8';

  const { recipe } = req.body;

  const result = await recipesService.removeFavoriteRecipe(recipe, user);
  handleResult(result);

  res.json(result);
};

const getAllFavoriteRecipe = async (req, res, next) => {
  const result = await recipesService.getAllFavoriteRecipe();
  res.json(result);
};

const getMyFavoriteRecipe = async (req, res, next) => {
  // const { _id: user } = req.user;
  const user = '64c8d958249fae54bae90bb8';
  const { page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;
  const filter = { user };

  const fields = '-createdAt -updatedAt -user';
  const settings = { skip, limit };

  const result = await recipesService.getMyFavoriteRecipe({
    filter,
    fields,
    settings,
  });

  res.json(result);
};

export default {
  getRecipesByFilter: ctrlWrapper(getRecipesByFilter),
  getOneRecipe: ctrlWrapper(getOneRecipe),
  getPopularRecipes: ctrlWrapper(getPopularRecipes),
  getRecipesFromUser: ctrlWrapper(getRecipesFromUser),
  addRecipe: ctrlWrapper(addRecipe),
  removeRecipe: ctrlWrapper(removeRecipe),
  addFavoriteRecipe: ctrlWrapper(addFavoriteRecipe),
  getAllFavoriteRecipe: ctrlWrapper(getAllFavoriteRecipe),
  getMyFavoriteRecipe: ctrlWrapper(getMyFavoriteRecipe),
  removeFavoriteRecipe: ctrlWrapper(removeFavoriteRecipe),
};
