const createError = require("http-errors");

const notFoundHandler = (req, res, next) => {
  next(createError(404, "your request routes not found"));
};

const errorHandler = (err, req, res, next) => {
  console.log(err);

  res.locals.error = process.env.NODE_ENV = "development"
    ? err
    : { message: err.message };
  res.status(err.status || 500);

  if (res.locals.html) {
    // html response
    res.render("error", {
      title: "errorPage",
    });
  } else {
    res.json(res.locals.error);
  }
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
