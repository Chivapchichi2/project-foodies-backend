import HttpError from '../helpers/httpError.js';

const isEmptyBody = (req, res, next) => {
  const { length } = Object.keys(req.body);
  if (!length) {
    return next(HttpError(400, 'Body must have at least one key'));
  }
  next();
};

export default isEmptyBody;
