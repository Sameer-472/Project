const Auth = require("../models/Auth.model");
const Reset = require("../models/Reset.model");

exports.getUserForAuth = async (email) =>
  await Auth.findOne({ email: email.toLowerCase() }).populate("user_auth");

exports.getPersonForProfile = async (schema, id) => {
  try {
    return await schema.findById(id).populate("auth", "email");
  } catch (error) {
    console.log(error);
  }
};

exports.createResetToken = async (email, code) => {
  const token = await Reset.findOne({ email });
  if (token) await token.remove();
  const newToken = new Reset({
    email,
    code,
  });
  await newToken.save();
};

exports.validateCode = (code, email) => Reset.findOne({ code, email });
