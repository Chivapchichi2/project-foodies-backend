import Joi from 'joi';

const ingredientsSchema = Joi.object().keys({
  name: Joi.string().required(),
  measure: Joi.number().required(),
});

export const createRecipeSchema = Joi.object({
  title: Joi.string().required(),
  area: Joi.string().required(),
  instructions: Joi.string().required(),
  description: Joi.string().required(),
  thumb: Joi.string().required(),
  time: Joi.string().required(),
  category: Joi.string().required(),
  // In question
  ingredients: Joi.array().items(ingredientsSchema).required(),
});
