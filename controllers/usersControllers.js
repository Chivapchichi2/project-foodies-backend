import * as usersService from '../services/usersServices.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';
import HttpError from '../helpers/HttpError.js';
import gravatar from 'gravatar';

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
