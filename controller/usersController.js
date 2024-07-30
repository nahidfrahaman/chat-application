const bcrypt = require("bcrypt");
const User = require("../model/userModel");

const getUsers = (req, res) => {
  res.render("users");
};

const createUser = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  console.log(hashedPassword);

  let newUser;

  if (req.files && req.files.length > 0) {
    console.log(req.body.password);

    newUser = new User({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashedPassword,
    });
  } else {
    newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
  }

  // save user or send error
  try {
    const result = await newUser.save();
    if (result) {
      res.status(200).json({
        message: "User was added successfully ",
      });
    }
  } catch (err) {
    console.log(err);

    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error occured",
        },
      },
    });
  }
};

module.exports = {
  getUsers,
  createUser,
};
