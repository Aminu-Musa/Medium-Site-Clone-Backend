const expRouter = require("express").Router();
const {
  postComment,
  getComment,
  getSingleComment,
} = require("../Controller/comment.controller");


expRouter.post("/addcomment", postComment);
expRouter.get("/", getComment);
expRouter.get("/:id", getSingleComment)




module.exports = expRouter;
