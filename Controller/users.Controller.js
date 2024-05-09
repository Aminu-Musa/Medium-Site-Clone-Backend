const userModel = require("../Models/user.model");

// @ desc: POST USER
// @ route: Post/api/users
const postUsers = async (req, res) => {
  try {
    const { email } = req.body;
    const newUserData = req.body;

    const checkUser = await  userModel.findOne({email});

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
      res.status(200).json({
        stateCode: 200,
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

    if (singleUser) {
      res.status(200).json({
        statusCode: 200,
        statusText: "OK",
        msg: `user: ${id} retrieved successfully`,
        data: singleUser,
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

    const updateUser = await userModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true, runValidators: true }
    );

    if (updateUser) {
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
};
