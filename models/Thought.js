const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: { type: String, required: true, maxLength: 280 },
  username: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => new Date(timestamp).toLocaleString(),
  },
});

const thoughtSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true, maxLength: 280, minlength: 1 },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => new Date(timestamp).toLocaleString(),
  },
  username: { type: String, required: true },
  reactions: [reactionSchema],
});
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = { thoughtSchema, Thought };
