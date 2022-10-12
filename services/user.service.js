const User = require("../models/User");

exports.signupService = async (userInfo) => {
  const user = await User.create(userInfo);
  return user;
};

exports.findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

exports.findUserByToken = async (token) => {
  return await User.findOne({ confirmationToken: token });
};

exports.findUserById = async (id) => {
  // return user info excluding password
  return await User.findOne({ _id: id }).select(
    "-password -__v -createdAt -updatedAt "
  );
};
