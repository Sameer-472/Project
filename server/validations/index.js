const bcrypt = require("bcryptjs");

const Auth = require("../models/Auth.model");

exports.comparePassword = (password, confirm_password) =>
  password === confirm_password;

exports.userExists = (email) => Auth.exists({ email: email.toLowerCase() });

exports.verifyPassword = async (password_to_comapre, password_base) =>
  await bcrypt.compare(password_to_comapre, password_base);

exports.validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  if (re.test(email)) return email.toLowerCase();
  else return false;
};
