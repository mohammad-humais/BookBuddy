const path = require("path");
// import .env variables
require("dotenv").config();
module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  mongo: {
    uri:
      process.env.NODE_ENV === "test"
        ? process.env.ONLINE_MONGO_TESTS
        : process.env.ONLINE_MONGO,
  },
  logs: process.env.NODE_ENV === "production" ? "combined" : "dev",
  emailAdd: process.env.EMAIL_ADDRESS,
  mailgunDomain: process.env.MAILGUN_DOMAIN,
  mailgunApi: process.env.MAILGUN_API_KEY,
};
