const Feedback = require("../models/Feedback");

const createFeedback = async (req, res) => {
  try {
    const { name, rating, comment } = req.body;

    const newFeedback = new Feedback({
      name,
      rating,
      comment
    });

    const savedFeedback = await newFeedback.save();

    res.status(201).json({
      message: "Feedback submitted successfully",
    });
  } 
  
  catch (error) {
    res.status(500).json({
      message: "Failed to submit feedback",
      error: error.message
    });
  }
};

const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
    res.status(200).json(feedbacks);
  }
  
  catch (error) {
    res.status(500).json({
      message: "Failed to fetch feedback",
      error: error.message
    });
  }
};

module.exports = {createFeedback, getAllFeedback};