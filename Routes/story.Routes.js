const expRouter = require("express").Router()
const {postStory, getStories, getStory, deleteStory, updateStory} = require("../Controller/story.controller")


expRouter.get("/", getStories)
expRouter.post("/", postStory)


expRouter.get("/:id", getStory)
expRouter.delete("/:id", deleteStory)
expRouter.put("/:id", updateStory)



module.exports = expRouter