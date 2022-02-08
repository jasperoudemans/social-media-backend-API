const mongoose = require("mongoose");

const thoughtSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true, maxLength: 280, minlength: 1 },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => new Date(timestamp).toLocaleString(),
  },
});
