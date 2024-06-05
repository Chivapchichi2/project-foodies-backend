import * as usersService from '../services/usersServices.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';
import HttpError from '../helpers/HttpError.js';
import cloudinary from '../helpers/cloudinary.js';
import fs from 'fs/promises';
import path from 'path';
import Jimp from 'jimp';

const signUp = async (req, res) => {};

const signIn = async (req, res) => {};

const signOut = async (req, res) => {};

const getCurrent = (req, res) => {};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path } = req.file;
  const img = await Jimp.read(path);
  await img.resize(250, 250).writeAsync(path);

  try {
    const { url: avatarURL } = await cloudinary.uploader.upload(path, {
      folder: 'avatars',
    });

    await userServices.updateUser(
      { _id},
      { avatarURL }
    );

    res.status(200).json({ avatarURL });
  } catch (err) {
    throw HttpError(400, err.message);
  } finally {
    await fs.unlink(path);
  }
};

export default {
  signUp: ctrlWrapper(signUp),
  signIn: ctrlWrapper(signIn),
  signOut: ctrlWrapper(signOut),
  getCurrent: ctrlWrapper(getCurrent),
  updateAvatar: ctrlWrapper(updateAvatar),
};
