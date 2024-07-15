const storyModel = require("../Models/story.model");

// POST: /api/story
const postStory = async (req, res) => {
  try {
    const storyBody = req.body;

    const createStory = new storyModel(storyBody);
    const newStory = await createStory.save();

    res.status(200).json({
      statusCode: 200,
      statusText: "Success",
      msg: "Story Created Successfully",
      data: newStory,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      statusText: "An error occurred",
      msg: err.massage,
    });
  }
};

// GET: /api/stories
const getStories = async (req, res) => {
  try {
    const allStories = await storyModel.find();

    res.status(200).json({
      statusCode: 200,
      statusText: "Success",
      msg: "All stories",
      data: allStories,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      statusText: "An error occurred",
      msg: err.message,
    });
  }
};

//GET Single Story
const getStory = async (req, res) => {
  const { id } = req.params;

  try {
    const singleStory = await storyModel.findById(id);

    if (singleStory) {
      res.status(200).json({
        statusCode: 200,
        statusText: "Success",
        msg: "Single story",
        data: singleStory,
      })
    } else {
      res.status(404).json({
        statusCode: 404,
        statusText: "Failed",
        msg: `No story with id: ${id} was found`,
      });
    }
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      statusText: "An error occurred",
      msg: err.message,
    });
  }
};

// PUT: /api/story/id
const updateStory = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body
    const story = await storyModel.findById(id)

    if (story.userId === userId) {
      const update = await storyModel.findByIdAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true,
      });

      if (update) {
        res.status(200).json({
          statusCode: 200,
          statusText: "Successful",
          msg: `Story id: ${id} has been updated`,
          data: update,
        });
      } else {
        res.status(404).json({
          statusCode: 404,
          statusText: "Failed",
          msg: `No story with id: ${id} was found`,
        });
      }
    }else{
      res.status(403).json({
        statusCode:403,
        statusText: "authorization failed"
      })
    }
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
    const deleteStory = await storyModel.findByIdAndDelete(id);

    if (deleteStory) {
      res.status(200).json({
        statusCode: 200,
        statusText: "Successful",
        msg: `Story with id: ${id} has been deleted`,
      });
    } else {
      res.status(404).json({
        statusCode: 404,
        statusText: "Failed",
        msg: `No story with id: ${id} was found`,
      });
    }
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      statusText: "An error occured",
      msg: err.message,
    });
  }
};

module.exports = {
  postStory,
  getStories,
  updateStory,
  deleteStory,
  getStory,
};
