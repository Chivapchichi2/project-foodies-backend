import * as recipesService from "../services/recipesServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

const getRecipesByFilter = async (req, res) => {};


export default {
  getRecipesByFilter: ctrlWrapper(getRecipesByFilter),
};
