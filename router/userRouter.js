const express = require("express");
const router = express.Router();
const { getUsers, createUser } = require("../controller/usersController");
const decorateHtmltitle = require("../middlewares/common/decorateHtml");
const avatarUpload = require("../middlewares/users/avataruploads");

const {
  addUserValidator,
  addUserValidatorHandler,
} = require("../middlewares/users/userValidator");

router.get("/", decorateHtmltitle("users"), getUsers);

// post user
router.post(
  "/",
  avatarUpload,
  addUserValidator,
  addUserValidatorHandler,
  createUser
);

module.exports = router;
