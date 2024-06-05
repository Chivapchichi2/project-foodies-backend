import Favorite from '../db/models/Favorite.js';
import Recipe from '../db/models/Recipe.js';

export const listRecipes = (search = {}) => {
  const { filter = {}, fields = '', settings = {} } = search;
  return Recipe.find(filter, fields, settings).populate(
    'owner',
    'username email'
  );
};

export const getRecipeById = recipetId => {
  return Recipe.findOne({ _id: recipetId });
};

export const removeRecipe = (recipeId, owner) => {
  return Recipe.findOneAndDelete({ _id: recipeId, owner });
};

export const addRecipe = data => {
  return Recipe.create(data);
};

export const addFavoriteRecipe = (recipeId, userId) => {
  return Favorite.create({ recipe: recipeId, user: userId });
};

export const removeFavoriteRecipe = (recipeId, userId) => {
  return Favorite.findOneAndDelete({ recipe: recipeId, user: userId });
};

export const getMyFavoriteRecipe = (search = {}) => {
  const { filter = {}, fields = '', settings = {} } = search;
  return Favorite.find(filter, fields, settings).populate('recipe');
};

export const getAllFavoriteRecipe = () => {
  return Favorite.aggregate([
    {
      $group: {
        _id: '$recipe',
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
    {
      $limit: 10,
    },
    {
      $lookup: {
        from: 'recipes',
        localField: '_id',
        foreignField: '_id',
        as: 'recipe',
      },
    },
    {
      $unwind: '$recipe',
    },
    {
      $project: {
        _id: 0,
        recipe: 1,
        count: 1,
      },
    },
  ]);
};

export const updateRecipe = (recipeId, owner, data) => {
  return Recipe.findOneAndUpdate({ _id: recipeId, owner }, data);
};
