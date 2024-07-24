const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
  getAvatar,
} = require("../../controlers/auth/authIndex");
const {
  validateBody,
  validateSubscription,
} = require("../../validation/validationContacts");
const auth = require("../../middlewares/jwtMiddleware");
const { userSchema } = require("../../validation/validationUser");
const passport = require("../../middlewares/PassConf");
const upload = require("../../middlewares/uploadAvatar");


router.use(passport.initialize());

router.post("/signup", validateBody(userSchema), register);
router.post("/login", validateBody(userSchema), login);
router.get("/logout", auth, logout);
router.get("/current", auth, getCurrentUser);
router.patch("/", auth, validateSubscription, updateSubscription);
router.patch("/avatars", auth, upload.single("avatar"), updateAvatar);
router.get("/avatars/:avatarsFileName",getAvatar);

module.exports = router;
