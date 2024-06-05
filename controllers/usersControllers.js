import * as usersService from '../services/usersServices.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';
import HttpError from '../helpers/HttpError.js';
import gravatar from 'gravatar';
import compareHash from '../helpers/compareHash.js';
import { createToken } from '../helpers/jwt.js';
import cloudinary from '../helpers/cloudinary.js';
import fs from 'fs/promises';
import path from 'path';
import Jimp from 'jimp';

const signUp = async (req, res, next) => {
  const { email } = req.body;
  const user = await usersService.findUser({ email });
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

  const newUser = await usersService.saveUser({ ...req.body, avatarURL });
  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
    },
  });
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await usersService.findUser({ email });

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
  await usersService.updateUser({ _id: id }, { token });

  res.json({
    token,
    user: {
      name: user.name,
      email: user.email,
    },
  });
};

const signOut = async (req, res, next) => {
  const { _id } = req.user;
  await usersService.updateUser({ _id }, { token: null });
  res.status(204).json();
};

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

    await usersService.updateUser({ _id }, { avatarURL });

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
