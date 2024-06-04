import bcrypt from 'bcrypt';
import User from '../db/models/User.js';
import gravatar from 'gravatar';

export const findUser = filter => User.findOne(filter);

export const saveUser = async data => {
  const hashPassword = await bcrypt.hash(data.password, 10);
  const avatarURL = await gravatar.url(data.email, { s: '250' }, true);
  return User.create({ ...data, password: hashPassword, avatarURL });
};

export const updateUser = (filter, data) => User.findOneAndUpdate(filter, data);
