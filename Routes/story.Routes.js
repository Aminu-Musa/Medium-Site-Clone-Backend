const expRouter = require("express").Router()
const {postStory, getStory, deleteStory, updateStory} = require("../Controller/story.controller")


expRouter.post("/poststory", postStory)
expRouter.get("/", getStory)
expRouter.put("/", deleteStory)
expRouter.delete("/", updateStory)



module.exports = expRouter