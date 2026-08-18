const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema (
  {
    name: {
      type: String,
      require: true,
      trim: true
    }, 

    rating: {
      type: Number,
      require: true,
      min: 1,
      max: 5,
    }, 

    comment: {
      type: String,
      require: true,
      trim: true
    }
  }
);
const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;