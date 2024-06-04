import * as usersService from "../services/usersServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

const signUp = async (req, res) => {};

const signIn = async (req, res) => {};

const signOut = async (req, res) => {};

const getCurrent = (req, res) => {};

const updateAvatar = async (req, res) => {};

export default {
  signUp: ctrlWrapper(signUp),
  signIn: ctrlWrapper(signIn),
  signOut: ctrlWrapper(signOut),
  getCurrent: ctrlWrapper(getCurrent),
  updateAvatar: ctrlWrapper(updateAvatar),
};
