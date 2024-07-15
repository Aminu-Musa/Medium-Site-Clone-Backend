const bcrypt = require("bcrypt");
const userModel = require("../Models/user.model");

// @ desc: POST USER
// @ route: Post/api/users
const postUsers = async (req, res) => {
  try {
    const { email } = req.body
    const newUserData = req.body;

    const checkUser = await userModel.findOne({ email });

    if (!checkUser) {
      const createNewUser = new userModel(newUserData);
      const newUser = await createNewUser.save();

      res.status(200).json({
        stateCode: 200,
        statusText: "OK",
        msg: "User created successfully",
        data: newUser,
      });
      return;
    } else {
      res.status(400).json({
        stateCode: 400,
        statusText: "Duplicate",
        msg: `sorry user email: ${email} has already been registered`,
      });
    }
  } catch (err) {
    res.json({
      stateCode: 500,
      msg: err.message,
    });
  }
};


// @ desc: Get USERS
// @ route: Get/api/users
const getUsers = async (req, res) => {
  try {
    const getusers = await userModel.find();

    res.status(200).json({
      stateCode: 200,
      statusText: "successful",
      msg: "All users",
      data: getusers,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      statusText: "An error occured",
      msg: err.message,
    });
  }
};


// @ desc: Get USERS
// @ route: Get/api/user
const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const singleUser = await userModel.findById(id);
    const { password, updatedAt, ...other } = singleUser._doc

    if (singleUser) {
      res.status(200).json({
        statusCode: 200,
        statusText: "OK",
        msg: `user: ${id} retrieved successfully`,
        data: other,
      });
    } else {
      res.status(404).json({
        stateCode: 404,
        statusText: "failed",
        msg: `No user with id: ${id} was found`,
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


// @ desc: PUT / UPDATE USER
// @ route: Put/api/users
const putUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const { isAdmin } = req.body

    const updateUser = await userModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true, runValidators: true }
    );

    if (updateUser || isAdmin) {
      res.status(200).json({
        statusCode: 200,
        statusText: "OK",
        msg: `User with id: ${id} was updated successfully `,
        data: updateUser,
      });
    } else {
      res.status(404).json({
        statusCode: 404,
        statusText: "failed",
        msg: `No user with id: ${id} was found`,
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



// @ desc: FOLLOW USER
// @ route: Update/api/users/:id/follow
// You need to provide a userId in your form
const followUser = async (req, res) => {
  const { id } = req.params
  const { userId } = req.body

  // CHECKING IF CURRENT USER WANT'S TO FOLLOWING HIMSELF
  if (userId !== id) {
    try {
      const user_to_be_followed = await userModel.findById(id)
      const current_user = await userModel.findById(userId)

      // CHECKING IF CURRENT USER IS ALREADY FOLLOWING THE USER
      if (!user_to_be_followed.followers.includes(userId)) {
        await user_to_be_followed.updateOne({ $push: { followers: userId } })
        await current_user.updateOne({ $push: { followings: id } })
        res.status(200).json({
          statusCode: 200,
          statusText: `User ${id} has been followed`
        })
      } else {
        res.status(403).json({
          statusCode: 403,
          statusText: `Sorry you're already following this user ${id}`
        });
      }

    } catch (err) {
      res.status(500).json({
        statusCode: 500,
        statusText: "An error occured",
        msg: err.message,
      })
    }

  } else {
    res.status(403).json({
      statusCode: 403,
      statusText: "Sorry you can't follow yourself"
    });
  }
}



// @ desc: UNFOLLOW USER
// @ route: Update/api/users/:id/follow
// You need to provide a userId in your form
const unFollowUser = async (req, res) => {
  const { id } = req.params
  const { userId } = req.body

  // CHECKING IF CURRENT USER WANT'S TO FOLLOWING HIMSELF
  if (userId !== id) {
    try {
      const user_to_be_followed = await userModel.findById(id)
      const current_user = await userModel.findById(userId)

      // CHECKING IF CURRENT USER IS ALREADY FOLLOWING THE USER
      if (user_to_be_followed.followers.includes(userId)) {
        await user_to_be_followed.updateOne({ $pull: { followers: userId } })
        await current_user.updateOne({ $pull: { followings: id } })
        res.status(200).json({
          statusCode: 200,
          statusText: `User ${id} has been unfollowed`
        })
      } else {
        res.status(403).json({
          statusCode: 403,
          statusText: `Sorry you're not following this user ${id}`
        });
      }

    } catch (err) {
      res.status(500).json({
        statusCode: 500,
        statusText: "An error occured",
        msg: err.message,
      })
    }


  } else {
    res.status(403).json({
      statusCode: 403,
      statusText: "Sorry you can't unfollow yourself"
    });
  }
}

// @ desc: DELETE USER
// @ route: Delete/api/users
const deleteUsers = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await userModel.findByIdAndDelete(id);

    if (deleteUser) {
      res.status(200).json({
        statusCode: 200,
        statusText: "OK",
        msg: `User with id: ${id} was deleted`,
      });
    } else {
      res.status(404).json({
        statusCode: 404,
        statusText: "failed",
        msg: `User with id: ${id} was not found`,
      });
    }
  } catch (err) {
    res.json({
      statusCode: 500,
      statusText: "An error occured",
      msg: err.message,
    });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await userModel.findOne({
      email,
      password,
    });

    if (!checkUser) {
      res.status(404).json({
        statusCode: 404,
        statusText: "Bad Request",
        msg: "Invalid Email or Password",
      });
      return;
    }
    res.status(200).json({
      statusCode: 200,
      msg: "Login Successful",
      data: checkUser,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      statusText: "An error occured",
      msg: err.message,
    });
  }
};





module.exports = {
  getUsers,
  getUser,
  postUsers,
  putUsers,
  deleteUsers,
  loginUser,
  followUser,
  unFollowUser
};
