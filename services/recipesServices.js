import Favorite from '../db/models/Favorite.js';
import Recipe from '../db/models/Recipe.js';

export const listRecipes = async (search = {}) => {
  const { filter = {}, fields = '', settings = {} } = search;
  const total = await Recipe.countDocuments(filter);
  let data = await Recipe.find(filter, fields, settings)
    .populate('owner', '_id name avatar email')
    .populate({
      path: 'ingredients.id',
      select: 'name desc img',
    });

  data = data.map(recipe => {
    const ingredients = recipe.ingredients.map(ingredient => {
      return {
        ingredient: ingredient.id,
        measure: ingredient.measure,
      };
    });
    return { ...recipe.toObject(), ingredients };
  });

  return {
    total,
    data,
  };
};

export const getRecipeById = recipetId => {
  return Recipe.findOne({ _id: recipetId }).populate(
    'owner',
    '_id name avatar email'
  );
};

export const removeRecipe = (recipeId, owner) => {
  return Recipe.findOneAndDelete({ _id: recipeId, owner });
};

export const addRecipe = async data => {
  let newRecipe = await Recipe.create(data);
  newRecipe = await Recipe.findById(newRecipe._id).populate(
    'ingredients.id',
    'name desc img'
  );

  const ingredients = newRecipe.ingredients.map(ingredient => {
    return {
      ingredient: {
        _id: ingredient.id._id,
        name: ingredient.id.name,
        desc: ingredient.id.desc,
        img: ingredient.id.img,
      },
      measure: ingredient.measure,
    };
  });

  const response = {
    ...newRecipe.toObject(),
    ingredients,
  };

  return response;
};

export const addFavoriteRecipe = (recipeId, userId) => {
  return Favorite.create({ recipe: recipeId, user: userId });
};

export const removeFavoriteRecipe = (recipeId, userId) => {
  return Favorite.findOneAndDelete({ recipe: recipeId, user: userId });
};

export const getMyFavoriteRecipe = async (search = {}) => {
  const { filter = {}, fields = '', settings = {} } = search;

  const total = await Favorite.find(filter, fields, settings).countDocuments(
    filter
  );
  const data = await Favorite.find(filter, fields, settings).populate('recipe');
  return { total, data };
};

export const getAllFavoriteRecipe = async (skip, limit) => {
  const total = await Favorite.distinct('recipe').then(
    uniqueRecipes => uniqueRecipes.length
  );

  const data = await Favorite.aggregate([
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
      $skip: skip,
    },
    {
      $limit: limit,
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

  return { total, data };
};

export const updateRecipe = (recipeId, owner, data) => {
  return Recipe.findOneAndUpdate({ _id: recipeId, owner }, data);
};
