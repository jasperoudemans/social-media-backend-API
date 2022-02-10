const mongoose = require("mongoose");
const { thoughtSchema } = require("./Thought");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Invalid email address",
    ],
  },
  thoughts: [{ type: mongoose.Types.ObjectId, ref: "Thought" }],
  friends: [{ type: mongoose.Types.ObjectId, ref: "User" }],
});
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
