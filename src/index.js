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

// cors configuration
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// register json and routers to express server`
app.use(express.json()); // this enables the request body as json format
app.use(UserRouter);
app.use(AccomplishmentRouter);
app.use(cors(corsOptions));

app.listen(port, () => {
  console.log("server is running on port " + port);
});
