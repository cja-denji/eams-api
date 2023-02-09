const mongoose = require("mongoose");

// initialize db connection
const dbConnection = mongoose.connect("mongodb://127.0.0.1:27017/__eams_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true, // enable creation of index (e.g. unique, etc)
});

// test connection
dbConnection
  .then(() => {
    //console.log("connected");
  })
  .catch((e) => {
    console.log("not connected");
  });
