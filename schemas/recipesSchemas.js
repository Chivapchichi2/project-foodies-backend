import Joi from 'joi';

// To do ingredients schema
const ingredientsSchema = Joi.object({
  id: Joi.string().required(),
  measure: Joi.string().required(),
});

export const createRecipeSchema = Joi.object({
  title: Joi.string().required(),
  area: Joi.string().required(),
  instructions: Joi.string().required(),
  description: Joi.string().required(),
  thumb: Joi.string(),
  time: Joi.string().required(),
  category: Joi.string().required(),
  // In work
  ingredients: Joi.array().items(ingredientsSchema).required(),
});

export const favoriteRecipe = Joi.object({
  recipe: Joi.string().required(),
});
