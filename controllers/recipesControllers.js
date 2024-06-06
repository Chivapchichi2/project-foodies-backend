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

  const { total, data } = await recipesService.listRecipes({
    filter,
    fields,
    settings,
  });

  const totalPages = Math.ceil(total / limit);

  res.json({ total, currentPage: page, totalPages, data });
};

const getOneRecipe = async (req, res, next) => {
  const { id } = req.params;
  const result = await recipesService.getRecipeById(id);
  handleResult(result);
  res.json({ data: result });
};

const getRecipesFromUser = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 9 } = req.query;
  const skip = (page - 1) * limit;

  const filter = { owner };
  const fields = '-createdAt -updatedAt';
  const settings = { skip, limit };

  const { total, data } = await recipesService.listRecipes({
    filter,
    fields,
    settings,
  });

  const totalPages = Math.ceil(total / limit);

  res.json({ total, currentPage: page, totalPages, data });
};

const addRecipe = async (req, res, next) => {
  const { _id: owner } = req.user;
  const path = req.file;

  try {
    if (path) {
      const { url: thumb } = await cloudinary.uploader.upload(path, {
        folder: 'recipes',
      });

      const newRecipe = await recipesService.addRecipe({
        ...req.body,
        owner,
        thumb,
      });

      return res.status(201).json({ data: newRecipe });
    }

    const newRecipe = await recipesService.addRecipe({
      ...req.body,
      owner,
    });

    res.status(201).json({ data: newRecipe });
  } catch (err) {
    throw HttpError(400, err.message);
  } finally {
    if (path) {
      await fs.unlink(path);
    }
  }
};

const removeRecipe = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  const result = await recipesService.removeRecipe(id, owner);
  handleResult(result);

  res.json({ data: result });
};

const addFavoriteRecipe = async (req, res, next) => {
  const { _id: user } = req.user;
  const { recipe } = req.body;
  const { total: isFavorite } = await recipesService.getMyFavoriteRecipe({
    filter: { user, recipe },
  });

  const isRecipe = await recipesService.getRecipeById(recipe);
  if (!isRecipe) {
    throw HttpError(404, 'Recipe not found');
  }

  if (isFavorite) {
    throw HttpError(409, 'Recipe is already in favorites');
  }

  const result = await recipesService.addFavoriteRecipe(recipe, user);

  res.json({ data: result });
};

const removeFavoriteRecipe = async (req, res, next) => {
  const { _id: user } = req.user;

  const { recipe } = req.body;

  const result = await recipesService.removeFavoriteRecipe(recipe, user);
  handleResult(result);

  res.json({ data: result });
};

const getAllFavoriteRecipe = async (req, res, next) => {
  let { page = 1, limit = 10 } = req.query;
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const { total, data } = await recipesService.getAllFavoriteRecipe(
    skip,
    limit
  );

  const totalPages = Math.ceil(total / limit);

  res.json({ total, currentPage: page, totalPages, data });
};

const getMyFavoriteRecipe = async (req, res, next) => {
  const { _id: user } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const filter = { user };

  const fields = '-createdAt -updatedAt -user';
  const settings = { skip, limit };

  const { total, data } = await recipesService.getMyFavoriteRecipe({
    filter,
    fields,
    settings,
  });

  const totalPages = Math.ceil(total / limit);

  res.json({ total, currentPage: page, totalPages, data });
};

export default {
  getRecipesByFilter: ctrlWrapper(getRecipesByFilter),
  getOneRecipe: ctrlWrapper(getOneRecipe),
  getRecipesFromUser: ctrlWrapper(getRecipesFromUser),
  addRecipe: ctrlWrapper(addRecipe),
  removeRecipe: ctrlWrapper(removeRecipe),
  addFavoriteRecipe: ctrlWrapper(addFavoriteRecipe),
  getAllFavoriteRecipe: ctrlWrapper(getAllFavoriteRecipe),
  getMyFavoriteRecipe: ctrlWrapper(getMyFavoriteRecipe),
  removeFavoriteRecipe: ctrlWrapper(removeFavoriteRecipe),
};
