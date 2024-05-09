const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    user_id: {
      type: String,
      required: [true, "user_id is required"],
    },
    story_id: {
      type: String,
      require: [true, "comment_id is required"],
    },
    comment_body: {
      type: String,
      required: [true, "comment body is required"],
    },
  },
  { timestamps: true }
);

const commentModel = mongoose.model("comment", commentSchema);

module.exports = commentModel