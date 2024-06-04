import Recipe from '../db/models/Recipe.js';

export const listRecipes = (search = {}) => {
  const { filter = {}, fields = '', settings = {} } = search;
  return Recipe.find(filter, fields, settings).populate(
    'owner',
    'username email'
  );
};
