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

router.get("/:id", (req, res) => {
  User.findById(req.params.id).then((user) => res.json(user));
});

router.post("/", (req, res) => {
  User.create(req.body).then((saved) => {
    res.json(saved);
  });
});

router.put("/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((user) =>
    res.json(user)
  );
});

router.delete("/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id).then((user) => res.json(user));
});

module.exports = router;
