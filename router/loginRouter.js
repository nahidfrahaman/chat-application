const express = require("express");
const router = express.Router();

// import internal
const { getLogin } = require("../controller/loginController");
const decorateHtmltitle = require("../middlewares/common/decorateHtml");

router.get("/", decorateHtmltitle("login"), getLogin);

module.exports = router;
