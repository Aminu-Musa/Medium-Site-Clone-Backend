const storyModel = require("../Models/story.model");

// POST: /api/story
const postStory = async (req, res) => {
  const storyBody = req.body;

  const createStory = new storyModel(storyBody);

  const newStory = await createStory.save();

  try {
    const data = req.body;
    res.json({
      code: 200,
      statusText: "OK",
      msg: "Story Created Successfully",
      data: newStory,
    });
  } catch (err) {
    res.json({
      code: 404,
      msg: err.massage,
    });
  }
};

// GET: /api/story
const getStory = async (req, res) => {
  try {
    const allStories = await storyModel.find();

    res.json({
      code: 200,
      msg: "This a Story Url",
      data: allStories,
    });
  } catch (err) {
    res.json({
      code: 404,
      statusText: "an error occured",
      msg: err.message,
    });
  }
};

// PUT: /api/story/id
const updateStory = async (req, res) => {
  const id = req.params.id;

  try {
    res.json({
      code: 200,
      msg: `Story Updated ${id}`,
      data,
    });
  } catch (err) {
    res.json({
      code: 404,
      msg: err.message,
    });
  }
};

// DELETE: /api/story/id
const deleteStory = async (req, res) => {
  try {
    const id = req.params.id;
    res.json({
      code: 200,
      msg: `Story Updated ${id}`,
      data,
    });
  } catch (error) {
    res.json({
      code: 404,
      msg: err.message,
    });
  }
};

module.exports = {
  postStory,
  getStory,
  updateStory,
  deleteStory,
};
