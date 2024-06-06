import HttpError from '../helpers/HttpError.js';
import * as usersServices from '../services/usersServices.js';
import jwt from 'jsonwebtoken';

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, 'Authorization header not found'));
  }

  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    return next(HttpError(401, 'Bearer not found'));
  }

  try {
    const decoded = jwt.decode(token, { complete: true });

    if (!decoded) {
      throw HttpError(401, 'Token is invalid');
    }

    const now = Math.floor(Date.now() / 1000);
    const userId = decoded.payload.id;

    const user = await usersServices.findUser({ _id: userId });

    if (!user) {
      return next(HttpError(401, 'User not found'));
    }

    if (decoded.payload.exp < now) {
      console.log('expired token');
      await usersServices.updateUser({ _id: userId }, { token: null });
      return next(HttpError(401, 'Token expired. Please log in again.'));
    }

    if (!user.token) {
      return next(HttpError(401, 'User signed out'));
    }

    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, error.message));
  }
};

export default authenticate;
