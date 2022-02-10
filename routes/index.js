const express = require("express");
const router = express.Router();
const users = require("./users.js");
const thoughts = require("./thoughts.js");

router.use("/users", users);
router.use("/thoughts", thoughts);

module.exports = router;
