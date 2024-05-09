const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storySchema = new Schema(
  {
    user_id: {
      type: String,
      required: [true, "user_id is required"],
    },
    title: {
      type: String,
      required: [true, "story title is required"],
    },
    desc: {
      type: String,
      required: [true, "story Description is required"],
    },
    likes:{
        type: Number,
        default: 0
    },
    dislikes:{
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);


const storyModel = mongoose.model("story", storySchema)

module.exports = storyModel
