const expRouter = require("express").Router();

const {
  getUsers,
  getUser,
  postUsers,
  putUsers,
  deleteUsers,
  loginUser
} = require("../Controller/users.Controller");

expRouter.get("/", getUsers);
expRouter.get("/:id", getUser);

expRouter.post("/", postUsers);

expRouter.post("/login", loginUser);

expRouter.put("/:id", putUsers);

expRouter.delete("/:id", deleteUsers);

module.exports = expRouter;
