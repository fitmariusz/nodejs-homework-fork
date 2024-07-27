require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const gravatar = require("gravatar");
const fs = require("fs").promises;
const path = require("path");
const jimp = require("jimp");
const emailSend = require("../mail/email");
const { v4: uuidv4 } = require("uuid");

const secret = process.env.SECRET;

const register = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message:
          "This user is in the database. Change the e-mail address and try again.",
      });
    }

    const newUser = new User({ email });
    newUser.avatarURL = gravatar.url(email, { protocol: "https", s: "100" });
    newUser.setPassword(password);

    const payload = {
      uuid: uuidv4(),
    };

    newUser.verificationToken = jwt.sign(payload, secret, { expiresIn: "1d" });

    await newUser.save();
    await emailSend.email(
      `<h1>Verification mail</h1><a href="http://localhost:${process.env.PORT}/api/users/verify/${newUser.verificationToken}">Verification</a>`,
      "Verification mail in singup",
      email
    );
    res.status(201).json({
      user: {
        id: newUser._id,
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
        verificationToken: newUser.verificationToken,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.validPassword(password)) {
      return res.status(401).json({ message: "Email or password is wrong" });
    } else if (!user.verify) {
      return res
        .status(400)
        .json({ message: "First complete the verification" });
    }

    const payload = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "3d" });

    user.token = token;
    await user.save();

    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
        avatarURL: user.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    user.token = null;
    await user.save();

    res.status(204).json({
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Not suthorized" });
    }
    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
};

const updateSubscription = async (req, res, next) => {
  try {
    const { subscription } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { subscription },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      data: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateAvatar = async (req, res, next) => {
  const avatarsDir = path.join(__dirname, "../../public/avatars");
  try {
    const { path: tmpPath, originalname } = req.file;
    const { _id: userId } = req.user;

    const img = await jimp.read(tmpPath);
    await img.resize(250, 250).writeAsync(tmpPath);

    const uniqueName = `${userId}-${Date.now()}-${originalname}`;
    const avatarURL = path.join("avatars", uniqueName);
    const publicPath = path.join(avatarsDir, uniqueName);
    await fs.rename(tmpPath, publicPath);
    await User.findByIdAndUpdate(userId, { avatarURL }, { new: true });

    res.json({
      status: "success",
      code: 200,
      data: {
        avatarURL: `http://localhost:${
          process.env.PORT || 8000
        }/api/${avatarURL}`,
      },
    });
  } catch (error) {
    next(error);
  }
};

const verificationToken = async (req, res, next) => {
  const verificationToken = req.params.verificationToken;
  const existingUser = await User.findOne({ verificationToken });
  if (!existingUser) {
    return res.status(404).json({
      message: "User not found",
    });
  } else {
    const user = await User.findByIdAndUpdate(existingUser._id, {
      verify: true,
      verificationToken: null,
    });
    return res.status(200).json({
      message: "Verification successful",
      user,
    });
  }
};

const resendVerificationToken = async (req, res, next) => {
  try {
    const { email } = req.body;
    const verificationMail = await User.findOne({ email });
    if (!verificationMail) {
      return res.status(400).json({
        message: "User does not exist in the database",
      });
    } else if (verificationMail.verify) {
      return res.status(400).json({
        message: "Verification has already been passed",
      });
    }
    await emailSend.email(
      `<h1>Verification mail</h1><a href="http://localhost:${process.env.PORT}/api/users/verify/${verificationMail.verificationToken}">Verification</a>`,
      "Verification mail in singup",
      email
    );
    res.status(201).json({
      message: "Verification email sent",
      verificationToken: User.verificationToken,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
  verificationToken,
  resendVerificationToken,
};
