const express = require("express");
const { Thought } = require("../models/Thought");
const { User } = require("../models/User");
const router = express.Router();
const asyncHandler = require("express-async-handler");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const thoughts = await Thought.find();
    res.json(thoughts);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const thought = await Thought.findById(req.params.id);
    res.json(thought);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const newThought = await Thought.create(req.body);
    const updatedUser = await User.findByIdAndUpdate(req.body.userId, {
      $addToSet: { thoughts: newThought._id },
    });
    res.json(newThought);
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const update = await Thought.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(update);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    await Thought.findByIdAndDelete(req.params.id);
    res.status(200).send();
  })
);

module.exports = router;
