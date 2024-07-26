const express = require("express");
const router = express.Router();

const authIndex = require("../../controlers/auth/authIndex");
const validate = require("../../validation/validationContacts");
const auth = require("../../middlewares/jwtMiddleware");
const { userSchema } = require("../../validation/validationUser");
const passport = require("../../middlewares/PassConf");
const upload = require("../../middlewares/uploadAvatar");

router.use(passport.initialize());

router.post("/signup", validate.validateBody(userSchema), authIndex.register);
router.post("/login", validate.validateBody(userSchema), authIndex.login);
router.get("/logout", auth, authIndex.logout);
router.get("/current", auth, authIndex.getCurrentUser);
router.patch(
  "/",
  auth,
  validate.validateSubscription,
  authIndex.updateSubscription
);
router.patch("/avatars", auth, upload.single("avatar"), authIndex.updateAvatar);
router.get("/verify/:verificationToken", authIndex.verificationToken);

module.exports = router;
