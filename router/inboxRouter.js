const express = require("express");
const router = express.Router();
const { getInbox } = require("../controller/inboxController");
const decorateHtmltitle = require("../middlewares/common/decorateHtml");

router.get("/inbox", decorateHtmltitle("Inbox"), getInbox);

module.exports = router;
