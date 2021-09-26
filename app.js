const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const dotenv = require("dotenv").config();
const passport = require("passport");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
var cors = require("cors");

const app = express();
app.use(cors());

//// Body Parser Middleware ////
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//// Cookie Parser ////
app.use(cookieParser());

//// DataBase Connection ////
mongoose
  .connect(process.env.MONGO_LOCAL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database has connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

// Initializing Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//// Routes ////
const auth = require("./routes/pub/auth");
const user = require("./routes/secure/user");
const site = require("./routes/secure/site");
const post = require("./routes/secure/post");
const event = require("./routes/secure/event");
const community = require("./routes/secure/community");

//----- Mount Routers -----//

app.use("/api/pub/auth", auth);
app.use("/api/secure/user", user);
app.use("/api/secure/site", site);
app.use("/api/secure/post", post);
app.use("/api/secure/event", event);
app.use("/api/secure/community", community);

//// Error Handler
app.use((error, req, res, next) => {
  console.log("Main Error =>", error);
  const message = error.message;
  const status = error.status || 500;
  res.status(status).json({ message: message, error: error });
});
//// Setting Port for Server ////

//// Setting Port for Server ////
const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening to port ${PORT}`);
});
