const { check, validationResult } = require("express-validator");

const { unlink } = require("fs");
const path = require("path");

// impoprt user model
const User = require("../../model/userModel");
const createError = require("http-errors");

const addUserValidator = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not conatin anythin other than name")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          // throw error
          throw createError("Email already is used");
        }
      } catch (err) {
        // catch the error
        throw createError(err.message);
      }
    }),
  check("mobile")
    .isMobilePhone("bn-BD", {
      strictMode: true,
    })
    .withMessage("Mobile number must valid bd mobile nb with +880 code")
    .custom(async (value) => {
      try {
        const user = await User.findOne({ mobile: value });
        if (user) {
          // throw error
          throw createError("Mobile is  already is used");
        }
      } catch (err) {
        // catch the error
        throw createError(err.message);
      }
    }),
  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
    ),
];

const addUserValidatorHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // remove uploaded files
    if (req.files?.length > 0) {
      const { filename } = req.files[0];
      unlink(
        path.join(__dirname, `/../public/uploads/avatar/${filename}`),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }

    // response the errro
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  addUserValidator,
  addUserValidatorHandler,
};
