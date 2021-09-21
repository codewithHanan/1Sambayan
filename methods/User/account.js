const nodemailer = require("nodemailer");
const crypto = require("crypto");
// const async = require("async");
const Joi = require("joi");
const asyncHandler = require("../../middlewares/async");
const User = require("../../models/User");

//REGISTER USER API
const methods = {
  registerUser: asyncHandler(async (req, res, next) => {
    try {
      const schema = Joi.object().keys({
        name: Joi.string().max(250).required(),
        username: Joi.string().max(250).required(),
        email: Joi.string().email().required(),
        phone: Joi.string()
          .max(10)
          .pattern(/^[0-9]+$/)
          .required(),
        password: Joi.string().min(6).max(255).required(),
        confirm_password: Joi.string().min(6).max(255).required(),
      });

      // Storing Error Responses in Result //
      const results = schema.validate(req.body);
      if (results.error) {
        return res.status(400).send(results.error.details[0].message);
      }

      const { name, username, email, password, confirm_password, phone } =
        req.body;

      //// Check If Password and Confirm Password are same or not ////
      if (password !== confirm_password) {
        res.status(403).send("Password and Confirm Password are not same");
      }

      //// Check If user exist with this Email or not ////
      const result = await User.findOne({ email: email });
      if (result) {
        res.status(404).send("User already registered with this Email Address");
      } else {
        // Saving User in DataBase
        const user = await User.create({
          name,
          username,
          email,
          password,
          phone,
        });

        res.status(200).json({ user: user });
      }
    } catch (err) {
      next(err);
    }
  }),

  // Email Verfication for new Registrations //
  verifyEmail: asyncHandler(async (req, res, next) => {
    async.waterfall(
      [
        function (done) {
          crypto.randomBytes(20, function (err, buf) {
            var token = buf.toString("hex");
            done(err, token);
          });
        },
        function (token, done) {
          const email = req.body.email;
          User.findOne(
            {
              email: email,
            },
            function (err, user) {
              if (!user) {
                return res.status(403).json({
                  message: "No account with that email address exists",
                });
              }
              User.findOneAndUpdate(
                { email: email },
                {
                  $set: {
                    verifyEmailToken: token,
                    emailVerificationExpiresIn: Date.now() + 36000000,
                  },
                },
                { new: true },
                function (err) {
                  done(err, token, user);
                }
              );
            }
          );
        },
        function (token, user, done) {
          let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            tls: {
              rejectUnauthorized: false,
            },
            auth: {
              user: process.env.MailingId,
              pass: process.env.MailingPassword,
            },
          });
          var mailOptions = {
            to: user.email,
            from: process.env.MailingId,
            subject: "Verfication Email Request for WINA",
            text:
              "You are receiving this because you (or someone else) have requested to register your account on WINA.\n\n" +
              "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
              "http://" +
              req.headers.host +
              "/reset/" +
              token +
              "\n\n" +
              "If you did not request this, please ignore this email.\n",
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return res.status(400).json({ message: error.message });
            }
            res
              .status(200)
              .json({ message: "Verification Email has been sent" });
          });
        },
      ],
      function (err) {
        if (err) return next(err);
        res.status(200).send("Verfication Email has been sent Successfully");
      }
    );
  }),

  verifyEmailProcess: asyncHandler(async (req, res, next) => {
    async.waterfall(
      [
        function (done) {
          User.findOne(
            {
              verifyEmailToken: req.params.token,
              emailVerificationExpiresIn: {
                $gt: Date.now(),
              },
            },
            async function (err, user) {
              if (!user) {
                return res.status(403).json({
                  message: "Password reset token is invalid or has expired",
                });
              } else {
                var user = await User.findOneAndUpdate(
                  {
                    verifyEmailToken: req.params.token,
                  },
                  {
                    $set: {
                      status: "active",
                    },
                  }
                );

                let transporter = nodemailer.createTransport({
                  host: "smtp.gmail.com",
                  port: 587,
                  secure: false,
                  tls: {
                    rejectUnauthorized: false,
                  },
                  auth: {
                    user: process.env.MailingId,
                    pass: process.env.MailingPassword,
                  },
                });
                var mailOptions = {
                  to: user.email,
                  from: process.env.MailingId,
                  subject: "Success Message",
                  text:
                    "Hello,\n\n" +
                    "You have successfully verified " +
                    user.email +
                    " \n",
                };
                transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                    return res.status(400).json({ message: error.message });
                  }
                  res.status(200).json({
                    message: "Success! You have successfully registed on WINA",
                  });
                  done(err);
                });
              }
            }
          );
        },
      ],
      function (err) {
        console.log(err);
      }
    );
  }),

  //Login User
  login: asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const schema = Joi.object().keys({
      email: Joi.string().max(40).required().email(),
      password: Joi.string().min(6).max(255).required(),
    });

    const results = schema.validate(req.body);
    if (results.error) {
      return res.status(400).send(results.error.details[0].message);
    }

    //validating email and password
    if (!email || !password) {
      return res.status(400).send("Please provide email and password");
    }

    // check if user exists //
    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
      return res.status(400).send("You are not registered, Please Sign up!");
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).send("Password is Invalid");
    }
    helpers.sendTokenResponse(user, 200, res);
  }),

  // USER Logout
  logout: asyncHandler(async (req, res, next) => {
    req.session.destroy(() => {
      req.logOut();
      res.clearCookie("token");
      res.status(200).send("Logged out successfully");
    });
  }),
};
module.exports = methods;

const helpers = {
  //Get token from Model create cookie and send response
  sendTokenResponse: (user, statusCode, res) => {
    //create token

    const token = user.getSignedJwtToken();

    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    if (process.env.NODE_ENV === "production") {
      options.secure = true;
    }
    if (user) {
      res
        .status(statusCode)
        .cookie("token", token, options)
        .json({ token: token, user: user });
    } else {
      res.send("Invalid Permissions");
    }
  },
};
