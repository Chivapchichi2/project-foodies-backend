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

export const updateRecipe = (recipeId, owner, data) => {
  return Recipe.findOneAndUpdate({ _id: recipeId, owner }, data);
};
