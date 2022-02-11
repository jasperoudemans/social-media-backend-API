const express = require("express");
const { User } = require("../models/User");
const router = express.Router();
const asyncHandler = require("express-async-handler");

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
  User.findById(req.params.id)
    .populate("friends")
    .populate("thoughts")
    .then((user) => res.json(user));
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

router.post(
  "/:userId/friends/:friendId",
  asyncHandler(async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $addToSet: { friends: req.params.friendId },
      },
      { new: true }
    );

    res.json(updatedUser);
  })
);

router.delete(
  "/:userId/friends/:friendId",
  asyncHandler(async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $pull: { friends: req.params.friendId },
      },
      { new: true }
    );
    res.json(updatedUser);
  })
);

module.exports = router;
