const mongoose = require("mongoose");
const userDb = require("./user.model");

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number || String,
    required: true,
    min: 1,
    max: 5,
  },
  description: String,
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userDb",
  },
  userName: String,
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
