import express from 'express';
import authControllers from '../controllers/usersControllers.js';
import isEmptyBody from '../middlewares/isEmptyBody.js';
import authenticate from '../middlewares/authenticate.js';
import validateBody from '../decorators/validateBody.js';
import { userSignupSchema, userSigninSchema } from '../schemas/usersSchemas.js';
import isValidId from '../middlewares/isValidId.js';
import upload from '../middlewares/upload.js';

const usersRouter = express.Router();

usersRouter.post(
  '/signup',
  isEmptyBody,
  validateBody(userSignupSchema),
  authControllers.signUp
);

usersRouter.post(
  '/signin',
  isEmptyBody,
  validateBody(userSigninSchema),
  authControllers.signIn
);

usersRouter.get('/current', authenticate, authControllers.getCurrent);

usersRouter.post('/signout', authenticate, authControllers.signOut);

usersRouter.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  authControllers.updateAvatar
);

usersRouter.get('/followers', authenticate, authControllers.getFollowers);

export default usersRouter;
