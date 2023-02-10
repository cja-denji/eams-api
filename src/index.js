// import express server module
const express = require("express");
const cors = require('cors')
// import db connection file
require("./db/mongoose.js");

// routers
const UserRouter = require("./routers/UsersRouter");
const AccomplishmentRouter = require("./routers/AccomplishmentRouter");
// initialize express and port
const app = express();
const port = process.env.PORT || 8080;

// register json and routers to express server`
app.use(express.json()); // this enables the request body as json format
app.use(cors());
app.use(UserRouter);
app.use(AccomplishmentRouter);


app.listen(port, () => {
  console.log("server is running on port " + port);
});
