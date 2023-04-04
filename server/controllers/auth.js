const Auth = require("../models/Auth.model");
const User = require("../models/User.model");

const { generateEmail } = require("../services/generate_email");
const { generateHash } = require("../services/generate_hash");
const { generateToken } = require("../services/generate_token");
const { generateCode } = require("../services/generate_code");

const {
  userExists,
  validateEmail,
  verifyPassword,
  comparePassword,
} = require("../validations/index");
const { delete_file } = require("../services/delete_file");

const {
  getUserForAuth,
  getPersonForProfile,
  createResetToken,
  validateCode,
} = require("../queries");

// @User APIs
exports.registerUser = async (req, res) => {
  const session = await Auth.startSession();
  session.startTransaction();
  try {
    const opts = { session };
    const {
      name,
      phone_no,
      email: _email,
      password,
      password_confirmation,
    } = req.body;
    const email = validateEmail(_email);

    if (!email) throw new Error("Invalid Email Address");

    if (await userExists(email)) throw new Error("Email Already Registered");
    console.log(42, password, password_confirmation);

    if (!comparePassword(password, password_confirmation))
      throw new Error("Password did not match!");

    const user_image =
      req.files &&
      req.files.user_image &&
      req.files.user_image[0] &&
      req.files.user_image[0].path;

    const cnic_image_front =
      req.files &&
      req.files.cnic_image_front &&
      req.files.cnic_image_front[0] &&
      req.files.cnic_image_front[0].path;

    const cnic_image_back =
      req.files &&
      req.files.cnic_image_back &&
      req.files.cnic_image_back[0] &&
      req.files.cnic_image_back[0].path;

    console.log(65, req.files);
    console.log(66, user_image);
    console.log(67, cnic_image_front);
    console.log(68, cnic_image_back);
    const auth = new Auth({
      email,
      password: await generateHash(password),
    });

    const user = new User({
      name: name,
      phone_no: phone_no,
      user_image: user_image,
      cnic_image_front: cnic_image_front,
      cnic_image_back: cnic_image_back,
      status: true,
      auth: auth._id,
    });

    auth.user = await user._id;

    await user.save(opts);
    await auth.save(opts);

    await session.commitTransaction(opts);
    session.endSession(opts);

    await res.status(201).json({
      status: true,
      message: "User Registered",
    });
  } catch (err) {
    const user_image =
      req.files &&
      req.files.user_image &&
      req.files.user_image[0] &&
      req.files.user_image[0].path;

    const cnic_image_front =
      req.files &&
      req.files.cnic_image_front &&
      req.files.cnic_image_front[0] &&
      req.files.cnic_image_front[0].path;

    const cnic_image_back =
      req.files &&
      req.files.cnic_image_back &&
      req.files.cnic_image_back[0] &&
      req.files.cnic_image_back[0].path;

    if (user_image) delete_file(user_image);
    if (cnic_image_front) delete_file(cnic_image_front);
    if (cnic_image_back) delete_file(cnic_image_back);

    await session.abortTransaction();
    session.endSession();

    console.log("Error While registering user: ", err);
    res.status(500).json({ status: false, message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUserForAuth(email);
    if (!user) throw new Error("Invlaid Email/Password");

    const isEqual = await verifyPassword(password, user.password);
    if (!isEqual) throw new Error("Invlaid Email/Password");

    const user_to_send = await getPersonForProfile(User, user.user_auth._id);
    if (!user_to_send.status)
      throw new Error("You Have Been Blocked By The Admin");

    const token = await generateToken(
      user.email,
      user.user_auth._id,
      process.env.JWT_SECRET,
      { is_user: true }
    );

    await res.status(200).json({
      message: "User Logged In",
      token,
      user: user_to_send,
    });
  } catch (err) {
    console.log("Error while loggin in:", err);
    res.status(500).json({ message: err.message });
  }
};
