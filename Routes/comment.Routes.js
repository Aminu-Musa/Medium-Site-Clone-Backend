const expRouter = require("express").Router();
const {
  postComment,
  getComment,
  getComments,
  updateComment,
  deleteComment,
} = require("../Controller/comment.controller");

expRouter.post("/", postComment);
expRouter.get("/", getComments);
expRouter.get("/:id", getComment);
expRouter.put("/:id", updateComment);
expRouter.delete("/:id", deleteComment);

module.exports = expRouter;
