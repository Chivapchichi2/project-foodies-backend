import * as usersService from '../services/usersServices.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';
import HttpError from '../helpers/HttpError.js';
import gravatar from 'gravatar';
import compareHash from '../helpers/compareHash.js';
import { createToken } from '../helpers/jwt.js';

const signUp = async (req, res, next) => {
  try {
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
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await usersService.findUser({ email });

    if (user.token) {
      throw HttpError(403, 'User already logged in');
    }

    if (!user) {
      throw HttpError(401, 'Email or password invalid');
    }
    const comparePass = await compareHash(password, user.password);

    if (!comparePass) {
      throw HttpError(401, 'Email or password invalid');
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
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const signOut = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await usersService.updateUser({ _id }, { token: null });
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

const getCurrent = (req, res) => {};

const updateAvatar = async (req, res) => {};

export default {
  signUp: ctrlWrapper(signUp),
  signIn: ctrlWrapper(signIn),
  signOut: ctrlWrapper(signOut),
  getCurrent: ctrlWrapper(getCurrent),
  updateAvatar: ctrlWrapper(updateAvatar),
};
