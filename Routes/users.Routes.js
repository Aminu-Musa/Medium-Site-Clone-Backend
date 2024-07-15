const expRouter = require("express").Router();

const {
  getUsers,
  getUser,
  postUsers,
  putUsers,
  deleteUsers,
  loginUser,
  followUser,
  unFollowUser
} = require("../Controller/users.Controller");

expRouter.get("/", getUsers);
expRouter.get("/:id", getUser);

expRouter.post("/", postUsers);

expRouter.post("/login", loginUser);

expRouter.put("/:id", putUsers);

expRouter.patch("/follow/:id", followUser);
expRouter.patch("/unfollow/:id", unFollowUser);


expRouter.delete("/:id", deleteUsers);

module.exports = expRouter;
