const mongoose = require("mongoose");
const { mongo, env } = require("./vars");
// set mongoose Promise to Bluebird
mongoose.Promise = Promise;
// Exit application on error
mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});
// ...
// print mongoose logs in dev env
if (env === "development") {
  mongoose.set("debug", true);
}
/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
exports.connect = () => {
  mongoose.connect(mongo.uri, {
    useNewUrlParser: true,
    keepAlive: 1,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", function () {
    console.log("MongoDB is connected!");
  });
  return mongoose.connection; // Return the mongoose connection instance
};
