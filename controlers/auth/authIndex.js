require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const gravatar = require("gravatar");
const fs = require("fs").promises;
const path = require("path");
const jimp = require("jimp");

const secret = process.env.SECRET;

const register = async (req, res, next) => {
  const { email, password } = req.body;
console.log(email, password);
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
    await newUser.save();

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.validPassword(password)) {
      return res.status(401).json({ message: "Email or password is wrong" });
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
    console.log(uniqueName);
    const avatarURL = path.join("avatars", uniqueName);
    console.log(avatarURL);
    const publicPath = path.join(avatarsDir, uniqueName);
    console.log(publicPath);

    await fs.rename(tmpPath, publicPath);

    await User.findByIdAndUpdate(userId, { avatarURL }, { new: true });

    res.json({
      status: "success",
      code: 200,
      data: {
        avatarURL: `http://localhost:${
          process.env.MAIN_PORT || 8000
        }/api/${avatarURL}`,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAvatar = async (req, res, next) => { 
  try {
    res.send(req.params.avatarsFileName);
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
  getAvatar,

};
