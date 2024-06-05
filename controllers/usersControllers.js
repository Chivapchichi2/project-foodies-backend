import * as usersServices from '../services/usersServices.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';
import HttpError from '../helpers/HttpError.js';
import gravatar from 'gravatar';
import compareHash from '../helpers/compareHash.js';
import { createToken } from '../helpers/jwt.js';
import cloudinary from '../helpers/cloudinary.js';
import fs from 'fs/promises';
import path from 'path';
import Jimp from 'jimp';

const signUp = async (req, res) => {
  const { email } = req.body;
  const user = await usersServices.findUser({ email });
  if (user) {
    throw HttpError(409, 'Email already use');
  }

  const avatarURL = gravatar.url(
    email,
    {
      s: '250',
      r: 'pg',
      d: 'retro',
    },
    true
  );

  const newUser = await usersServices.saveUser({ ...req.body, avatarURL });
  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
    },
  });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await usersServices.findUser({ email });

  if (!user) {
    throw HttpError(401, 'Email or password invalid');
  }
  const comparePass = await compareHash(password, user.password);

  if (!comparePass) {
    throw HttpError(401, 'Email or password invalid');
  }

  if (user.token) {
    throw HttpError(403, 'User already logged in');
  }

  const { _id: id } = user;
  const payload = {
    id,
  };

  const token = createToken(payload);
  await usersServices.updateUser({ _id: id }, { token });

  res.json({
    token,
    user: {
      name: user.name,
      email: user.email,
    },
  });
};

const signOut = async (req, res) => {
  const { _id } = req.user;
  await usersServices.updateUser({ _id }, { token: null });
  res.status(204).json();
};

const getCurrent = (req, res) => {
  const { name, email, avatarURL, followers, following } = req.user;
  res.status(200).json({ name, email, avatarURL, followers, following });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path } = req.file;
  const img = await Jimp.read(path);
  await img.resize(250, 250).writeAsync(path);

  try {
    const { url: avatarURL } = await cloudinary.uploader.upload(path, {
      folder: 'avatars',
    });

    await usersServices.updateUser({ _id }, { avatarURL });

    res.status(200).json({ avatarURL });
  } catch (err) {
    throw HttpError(400, err.message);
  } finally {
    await fs.unlink(path);
  }
};

const getFollowers = async (req, res) => {
  const { _id } = req.user;
  const user = await usersServices.findUser({ _id }).populate('followers');
  if (!user) {
    throw HttpError(404, 'User not found');
  }

  res.status(200).json({ followers: user.followers });
};

export default {
  signUp: ctrlWrapper(signUp),
  signIn: ctrlWrapper(signIn),
  signOut: ctrlWrapper(signOut),
  getCurrent: ctrlWrapper(getCurrent),
  updateAvatar: ctrlWrapper(updateAvatar),
  getFollowers: ctrlWrapper(getFollowers),
};
