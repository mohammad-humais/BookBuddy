const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../../models/user.model");
var randomize = require("randomatic");
const { sendEmail } = require("./../../utils/emails");
const ObjectId = require("mongoose").Types.ObjectId;
const mongoose = require("mongoose");
var nodemailer = require("nodemailer");
// const faker = require("faker");
exports.register = async (req, res, next) => {
  try {
    let { firstName, lastName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.send({
        success: false,
        message: "Password and Confirm Password should match",
      });
    }
    if (password.length <= 6) {
      return res.send({
        success: false,
        message: "Password Length should be greater than 6",
      });
    }
    if (!firstName || !lastName || !email || !password) {
      return res.send({
        success: false,
        message: "Please fill all required fields",
      });
    }
    let payload = req.body;
    let user = await User.findOne({
      $or: [{ email }],
    });
    if (user)
      return res.send({
        success: false,
        data: user,
        message: "An email already associated to some other user",
      });
    user = await User.create(payload);
    await user.save();

    // const link = `${process.env.BASE_URL}/v1/front/users/verify-email/${user._id}/${emailVerificationCode}`; // change
    // sendEmail(
    //   user.email,
    //   "verifyEmail",
    //   { email: user.email, url: link },
    //   "Email Verification"
    // );
    // user = user.toObject();
    // delete user.emailVerificationCode;
    // delete user.password;
    // delete user.__v;
    return res.send({
      success: true,
      data: user,
      message: "User Signup successfully.",
    });
  } catch (error) {
    return next(error);
  }
};
exports.login = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    if (password.length <= 6) {
      return res.send({
        success: false,
        message: "Password Length should be greater than 6",
      });
    }
    const user = await User.findOne({ email }).lean();
    if (!user)
      return res
        .status(404)
        .send({ success: false, message: "Incorrect email or password" });
    passport.use(
      new localStrategy(
        { usernameField: "email" },
        (username, password, done) => {
          User.findOne(
            { email: username },
            "name email wallet password",
            (err, user) => {
              if (err) {
                return done(err);
              } else if (!user)
                // unregistered email
                return done(null, false, {
                  success: false,
                  message: "Incorrect email or password",
                });
              else if (!user.verifyPassword(password))
                // wrong password
                return done(null, false, {
                  success: false,
                  message: "Incorrect email or password",
                });
              else return done(null, user);
            }
          );
        }
      )
    );
    // call for passport authentication
    passport.authenticate("local", async (err, user, info) => {
      if (err)
        return res.status(400).send({
          err,
          success: false,
          message: "Oops! Something went wrong while authenticating",
        });
      // registered user
      else if (user) {
        var accessToken = await user.token();
        let data = {
          ...user._doc,
          accessToken,
        };
        await User.updateOne(
          { _id: user._id },
          { $set: { accessToken } },
          { upsert: true }
        );
        return res.status(200).send({
          success: true,
          message: "User logged in successfully",
          data,
        });
      }
      // unknown user or wrong password
      else
        return res
          .status(402)
          .send({ success: false, message: "Incorrect email or password" });
    })(req, res);
  } catch (error) {
    return next(error);
  }
};
exports.verifyEmail = async (req, res) => {
  // const { id, token } = req.params;
  // const user = await User.findOne({
  //   _id: id,
  // });
  // if (!user || (user && user.emailVerificationCode !== token)) {
  //   return res.json({ status: false, message: "Invalid request" });
  // }
  // user.emailVerified = true;
  // user.emailVerificationCode = undefined;
  // await user.save();
  // return res.status(200).send({
  //   success: true,
  //   message: "Account verified successfully!",
  // });
};
exports.updateProfile = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      currentPassword,
      newPassword,
      confirmPassword,
    } = req.body;
    if (
      !firstName &&
      !lastName &&
      !phone &&
      !currentPassword &&
      !newPassword &&
      !confirmPassword
    ) {
      return res.send({
        success: false,
        message: "Please enter one field to update your profile",
      });
    }
    if (currentPassword) {
      if (!confirmPassword && !newPassword) {
        return res.send({
          success: false,
          message: "Please enter your new password ",
        });
      }
    }
    if (
      (confirmPassword !== "" && newPassword !== "") ||
      confirmPassword !== "" ||
      newPassword !== ""
    ) {
      if (!currentPassword) {
        return res.send({
          success: false,
          message: "Please enter your current password",
        });
      }
      if (confirmPassword !== newPassword) {
        return res.send({
          success: false,
          message: "New Password doesn't match with confirm password",
        });
      }
    }
    var data = req.body;
    const userID = req.payload;
    if (!userID) {
      return res.send({
        success: false,
        message: "User id is required",
      });
    }
    const user = await User.findOne({ _id: userID });
    if (currentPassword) {
      const match = await bcrypt.compare(currentPassword, user.password);
      if (!match) {
        return res.send({
          success: false,
          message: "Your cuurent Password doesn't match ",
        });
      }
      delete data.currentPassword;
      delete data.confirmPassword;
      const password = data.newPassword;
      data = { ...data, password };
      delete data.newPassword;
    }
    const nonEmptyFields = {};
    for (const key in data) {
      if (data.hasOwnProperty(key) && data[key]) {
        nonEmptyFields[key] = data[key];
      }
    }
    const userData = await User.findOneAndUpdate(
      { _id: userID },
      nonEmptyFields,
      {
        new: true,
      }
    ).select("-password");
    return res.send({
      success: true,
      message: "User updated successfully",
      data: userData,
    });
  } catch (error) {
    return next(error);
  }
};
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    // Check if the email exists and fetch the user record from the database
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Email not found" });
    }
    // Generate a random forgot password code
    const resetPasswordCode = Math.floor(100000 + Math.random() * 900000);
    // Update the user record in the database with the forgot password code
    user.forgotPasswordCode = resetPasswordCode;
    await user.save();
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: "johscxogbqssppjl", // // Replace with your application-specific password
      },
    });
    const timestamp = Date.now() + 180000; // 180 seconds from now
    const link = `${process.env.PRODUCTION_URL_RESET_PASSWORD}/reset-password?token=${resetPasswordCode}&timestamp=${timestamp}`;

    const getResponse = await sendEmail(
      user.email,
      "forgotPassword",
      { url: link },
      "Forgot your password"
    );
    res.status(200).json({
      success: true,
      data: user._id,
      message: "Forgot password code sent to your email",
    });
  } catch (error) {
    console.error("Error sending forgot password code:", error);
    res.status(500).json({ message: "Internal server error" });
  }
  // try {
  //   const { email } = req.body;
  //   const user = await User.findOne({ email: email });
  //   if (!user) {
  //     return res.json({ success: false, message: "User Not Exists!!" });
  //   }
  //   const resetPasswordCode = randomize("Aa0", 10);
  //   user.forgotPasswordCode = resetPasswordCode;
  //   await user.save();
  //   const timestamp = Date.now() + 60000; // 60 seconds from now
  //   const link = `http://localhost:3000/reset-password/?token=${resetPasswordCode}&timestamp=${timestamp}`;
  //   const obj = {
  //     _id: user._id,
  //   };
  //   // const link = `${process.env.BASE_URL}/v1/front/users/reset-password/${user._id}/${resetPasswordCode}`;
  //   sendEmail(
  //     user.email,
  //     "forgotPassword",
  //     { url: link },
  //     "Forgot our password"
  //   );
  //   return res.status(200).send({
  //     success: true,
  //     message: "Password reset link sent to email address",
  //     data: obj,
  //   });
  // } catch (error) {
  //   return next(error);
  // }
};
exports.verifyToken = async (req, res, next) => {
  try {
    const { id, token } = req.body;
    if (id !== "undefined") {
      var user = await User.findOne({ _id: id });
      if (!user || (user && user.forgotPasswordCode !== token)) {
        return res.json({ success: false, message: "Invalid request" });
      }
    }
    return res.status(200).send({
      success: true,
      message: "Token is Valid.",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
exports.linkExpired = async (req, res, next) => {
  try {
    const timestamp = parseInt(req.body.timestamp, 10);
    if (Date.now() > timestamp) {
      return res.json({
        success: false,
        message: "The password reset link has expired.",
      });
    }
    return res.status(200).send({
      success: true,
      message: "The password reset link is not expired.",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
exports.resetPassword = async (req, res, next) => {
  try {
    const { id, token, password } = req.body;
   
    const user = await User.findOne({ _id: id });
    if (!user || (user && user.forgotPasswordCode !== token)) {
      return res.json({ success: false, message: "Invalid request" });
    }
    user.password = password;
    user.forgotPasswordCode = undefined;
    await user.save();
    return res.status(200).send({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
exports.getprofileData = async (req, res, next) => {
  try {
    const userID = req.payload;
    if (!userID) {
      return res.send({
        success: false,
        message: "User id is required",
      });
    }
    const user = await User.findOne({ _id: userID });
    return res.status(200).send({
      success: true,
      message: "Get Profile Successfully.",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
exports.resetSessionTimer = async (req, res, next) => {
  try {
    req.session.touch(); // Reset the session timer
    return res.status(200).send({
      success: true,
      message: "Session timer reset.",
    });
  } catch (error) {
    return next(error);
  }
};
exports.gets = async (req, res, next) => {
  try {
    return res.status(200).send({
      success: true,
      message: "hello.",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};