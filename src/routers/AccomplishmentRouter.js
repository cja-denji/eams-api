// import express server module
const express = require("express");
const { locales } = require("validator/lib/isiban");
// initialize this files as express router
const router = new express.Router();
// model
const AccomplishmentModel = require("../models/AccomplishmentModel");

// test request
router.get("/Accomplishment/test", async (req, res) => {
  try {
    res.status(200).send({
      status: "ok",
    });
  } catch (e) {
    res.status(500).send();
  }
});

// get all accomplishments
router.get("/Accomplishment/fetchAccomplishments", async (req, res) => {
  try {
    const accomplishment = await AccomplishmentModel.find({});
    res.send(accomplishment);
  } catch (e) {
    res.status(500).send();
  }
});

// add accomplishment
router.post("/Accomplishment/addAccomplishment", async (req, res) => {
  const accomplishment = new AccomplishmentModel(req.body);

  try {
    await accomplishment.save();
    res.status(201).send(accomplishment);
  } catch (e) {
    res.status(400).send(e);
  }
});

// retrieve accomplishment details
router.get("/Accomplishment/getAccomDetails/:accom_id", async (req, res) => {
  const _accom_id = req.params.accom_id;

  try {
    const accomplishment = await AccomplishmentModel.findById(_accom_id);
    return accomplishment === null
      ? res.status(404).send()
      : res.send(accomplishment);
  } catch (e) {
    res.status(500).send();
  }
});

// update accomplishment details
router.patch(
  "/Accomplishment/updateAccomDetails/:accom_id",
  async (req, res) => {
    //#region check if all of the keys are valid and matched to the fields in db
    const keys = Object.keys(req.body);
    const allowedKeys = ["title", "desc", "date", "status", "user_id"];
    // check every keys from the request body if existed inside the allowed keys variable
    const isValidOperation = keys.every((key) => allowedKeys.includes(key));

    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid key" });
    }

    //#endregion

    const _accom_id = req.params.accom_id;
    try {
      const accom = await AccomplishmentModel.findById(_accom_id);
      keys.forEach((key) => (accom[key] = req.body[key]));
      await accom.save();

      // this is commented in order for the middleware of the usermodel schema work. this line of code directly manipulate the database and skip the middleware functionality
      //const user = await UserModel.findByIdAndUpdate(_user_id, req.body, { new: true, runValidators: true })
      return accom === null ? res.status(404).send() : res.send(accom);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

// delete accomplishment
router.delete("/Accomplishment/deleteAccom/:accom_id", async (req, res) => {
  const _accom_id = req.params.accom_id;

  try {
    const accom_2Dlt = await AccomplishmentModel.findByIdAndDelete(_accom_id);
    return accom_2Dlt === null ? res.status(404).send() : res.send(accom_2Dlt);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
