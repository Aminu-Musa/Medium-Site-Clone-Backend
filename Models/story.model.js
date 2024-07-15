const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storySchema = new Schema(
  {
    userId: {
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
    image:{
        type: String,
    },
    likes:{
        type: Array,
        default: []
    },
    dislikes:{
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);


const storyModel = mongoose.model("story", storySchema)

module.exports = storyModel
