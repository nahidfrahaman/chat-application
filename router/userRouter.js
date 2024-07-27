const express = require("express");
const router = express.Router();
const { getUsers } = require("../controller/usersController");
const decorateHtmltitle = require("../middlewares/common/decorateHtml");

router.get("/users", decorateHtmltitle("users"), getUsers);

module.exports = router;
