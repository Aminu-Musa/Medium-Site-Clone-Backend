const commentModel = require("../Models/comment.model");

const postComment = async (req, res) => {
  try {
    const commentContent = req.body;
    const createComment = await new commentModel(commentContent);
    const newComment = await createComment.save();
    res.json({
      code: 200,
      statusText: "Ok",
      msg: "A comment has been made",
      data: newComment,
    });
  } catch (err) {
    res.json({
      code: 400,
      statuText: "Bad Request error",
      msg: err.message,
    });
  }
};

const getComment = async (req, res) => {
  try {
    const allcomments = await commentModel.find();
    res.json({
      code: 200,
      statusText: "Ok",
      msg: "All Comments",
      data: allcomments,
    });
  } catch (err) {
    res.json({
      code: 400,
      statuText: "Bad Request error",
      msg: err.message,
    });
  }
};

const getSingleComment = async (req, res) => {
  try {
    if (req.params.id) {
      const comment = await commentModel.find({story_id: req.params.id});
      
      res.json({
        code: 200,
        statusText: "Ok",
        msg: "Single ost comments",
        data: comment,
      });
    } else {
      res.json({
        code: 400,
        statusText: "Bad Request",
        msg: "'user_id' required in the request params",
      });
    }
  } catch (err) {
    res.json({
      code: 400,
      statuText: "Bad Request error",
      msg: err.message,
    });
  }
};

module.exports = {
  postComment,
  getComment,
  getSingleComment,
};
