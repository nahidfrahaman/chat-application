const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

// internal import
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandling");
const userRoutes = require("./router/userRouter");
const inboxRoutes = require("./router/inboxRouter");
const loginRoutes = require("./router/loginRouter");

const app = express();
dotenv.config();

//database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => console.log("database connection successful"))
  .catch((err) => console.log(err));

// request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");

//set static folder
app.use(express.static(path.join(__dirname, "public")));

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
app.use("/", loginRoutes);
app.use("/", inboxRoutes);
app.use("/", userRoutes);

// unkown routing handling
app.use(notFoundHandler);
app.use(errorHandler);

// error handling
app.listen(process.env.PORT, () => {
  console.log(`server is running port ${process.env.PORT}`);
});
