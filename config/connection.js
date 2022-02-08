const mongoose = require("mongoose");

mongoose.connect(
  process.env.DB_CONNECTION_STRING ||
    "mongodb://localhost:27017/socialNetworkDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

module.exports = mongoose.connection;
