const commentModel = require("../Models/comment.model");

// CREATE COMMENT
const postComment = async (req, res) => {
  try {
    const commentContent = req.body;
    const createComment = await new commentModel(commentContent);

    const newComment = await createComment.save();
    res.status(200).json({
      statusCode: 200,
      statusText: "Successful",
      msg: "A comment has been made successfully",
      data: newComment,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      statuText: "An error occurred",
      msg: err.message,
    });
  }
};

// GET ALL COMMENTS
const getComments = async (req, res) => {
  try {
    const allcomments = await commentModel.find();
    res.status(200).json({
      statusCode: 200,
      statusText: "Successs",
      msg: "All Comments",
      data: allcomments,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      statuText: "An error occurred",
      msg: err.message,
    });
  }
};

// GET SINGLE COMMENT
const getComment = async (req, res) => {
  try {
    const { id } = req.params;
    const Singlecomment = await commentModel.findById(id);

    if (Singlecomment) {
      res.status(200).json({
        statusCode: 200,
        statusText: "Success",
        msg: `Single comment, id: ${id} `,
        data: Singlecomment,
      });
    } else {
      res.status(400).json({
        statusCode: 400,
        statusText: "failed",
        msg: `No comment with id: ${id} was found`,
      });
    }
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      statuText: "An error occurred",
      msg: err.message,
    });
  }
};

// UPDATE COMMENT
const updateComment = async (req, res) => {
  try {
    const { id } = req.params;

    const update = await commentModel.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (update) {
      res.state(200).json({
        statusCode: 200,
        statusText: "Success",
        msg: `Comment id:${id} has been updated`,
        data: update,
      });
    } else {
      res.status(400).json({
        statusCode: 400,
        statusText: "Failed",
        msg: `No comment with id: ${id} was found`,
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

// DELETE COMMENT
const deleteComment = async (req, res) => {
  const { id } = req.params;

  const deleteComent = await commentModel.findByIdAndDelete(id);
  if (deleteComent) {
    res.status(200).json({
      statusCode: 200,
      statusText: "Success",
      msg: `Comment with id: ${id} has been deleted`,
    });
  } else {
    res.status(400).json({
      statusCode: 400,
      statusText: "Failed",
      msg: `No comment with id: ${id} was found`,
    });
  }
};

module.exports = {
  postComment,
  getComments,
  getComment,
  updateComment,
  deleteComment
};
