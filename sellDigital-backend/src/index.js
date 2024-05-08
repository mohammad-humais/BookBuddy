Promise = require("bluebird");
const { port } = require("./config/vars");
const { app } = require("./config/express"); // Import app and store from express.js
const mongoose = require("./config/mongoose");
const http = require("http");
// Connect to MongoDB and start the server

mongoose.connect().then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
