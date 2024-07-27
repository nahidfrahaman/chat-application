const { get } = require("mongoose");

const getInbox = (req, res) => {
  res.render("inbox");
};

module.exports = {
  getInbox,
};
