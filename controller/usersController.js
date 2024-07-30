const bcrypt = require("bcrypt");
const User = require("../model/userModel");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    // send response in html
    res.render("users", {
      users: users,
    });
  } catch (ere) {}
};

const createUser = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  let newUser;

  if (req.files && req.files.length > 0) {
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
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error occured",
        },
      },
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const users = await User.findByIdAndDelete(req.params.id);

    // send response in html
    res.status(200).json({
      msg: "user deleted successfully",
    });
  } catch (ere) {
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
  deleteUser,
};
