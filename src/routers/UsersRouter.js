// import express server module
const express = require("express");
// initialize this files as express router
const router = new express.Router();
// model
const UserModel = require("../models/UserModel");

// test request
router.get("/User/test", async (req, res) => {
  try {
    res.status(200).send();
  } catch (err) {
    res.status(500).send();
  }
});

// get all users
router.get("/User/fetchUsers", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
});

// add user
router.post("/User/addUser", async (req, res) => {
  const user = new UserModel(JSON.parse(req.body));

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// retrieve user details
router.get("/User/getUserDetails/:user_id", async (req, res) => {
  const _user_id = req.params.user_id;

  try {
    const user = await UserModel.findById(_user_id);
    return user === null ? res.status(404).send() : res.send(user);
  } catch {
    res.status(500).send();
  }
});

// update user details
router.patch("/User/updateUserDetails/:user_id", async (req, res) => {
  //#region check if all of the keys are valid and matched to the fields in db
  const keys = Object.keys(req.body);
  const allowedKeys = [
    "fname",
    "lname",
    "email",
    "password",
    "usertype",
    "status",
  ];
  // check every keys from the request body if existed inside the allowed keys variable
  const isValidOperation = keys.every((key) => allowedKeys.includes(key));

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid key" });
  }

  //#endregion

  const _user_id = req.params.user_id;
  try {
    const user = await UserModel.findById(_user_id);
    keys.forEach((key) => (user[key] = req.body[key]));
    await user.save();

    // this is commented in order for the middleware of the usermodel schema work. this line of code directly manipulate the database and skip the middleware functionality
    //const user = await UserModel.findByIdAndUpdate(_user_id, req.body, { new: true, runValidators: true })
    return user === null ? res.status(404).send() : res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

// delete user
router.delete("/User/deleteUser/:user_id", async (req, res) => {
  const _user_id = req.params.user_id;
  try {
    const userToDelete = await UserModel.findByIdAndDelete(_user_id);
    return userToDelete === null
      ? res.status(404).send()
      : res.send(userToDelete);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
