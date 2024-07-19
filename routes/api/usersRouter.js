const express = require("express");
const router = express.Router();
const { register, login, logout, getCurrentUser } = require("../../controlers/auth/authIndex");
const {
  validateBody,
  // validateSubscription,
} = require("../../validation/validationContacts");
const auth = require("../../middlewares/jwtMiddleware");
const { userSchema } = require("../../validation/validationUser");
const passport = require("../../middlewares/PassConf");

router.use(passport.initialize()); 

router.post("/signup", validateBody(userSchema), register);
router.post("/login", validateBody(userSchema), login);
router.get("/logout", auth, logout);
router.get("/current", auth, getCurrentUser);

module.exports = router;
