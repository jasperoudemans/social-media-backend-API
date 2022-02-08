const express = require("express");
const { User } = require("../models/user");
const router = express.Router();

router.get("/", (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/", (req, res) => {
  User.create(req.body).then((saved) => {
    res.json(saved);
  });
});

module.exports = router;
