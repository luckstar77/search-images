const models = require('../models');
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {
  signup: async (username, password) => {
    const user = await models.users.findOne({
      username,
    });
    if (user) throw new Error('This username has been used.');
    return await models.users.create({
      username,
      password: await bcrypt.hash(password, saltRounds),
    });
  },
  login: async (username, password) => {
    const user = await models.users.findOne({
      username,
    });
    if (!user) throw new Error('This username has not signup');
    if (!bcrypt.compare(password, user.password))
      throw new Error('This password is not correct');
    return user;
  },
  isExist: async id => {
    const user = await models.users.findOne({
      _id: id,
    });
    if (!user) return false;
    return true;
  },
  deleteAll: async () => {
    return await models.users.deleteMany();
  },
};
