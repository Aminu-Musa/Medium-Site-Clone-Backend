const userModel = require("../Models/user.model");

// @ desc: POST USER
// @ route: Post/api/users
const postUsers = async (req, res) => {
  try {
    const newUserData = req.body;
    const createNewUser = new userModel(newUserData);

    const newUser = await createNewUser.save();

    res.status(200).json({
      code: 200,
      statusText: "OK",
      msg: "User created successfully",
      data: newUser,
    });
  } catch (err) {
    res.json({
      code: 400,
      msg: err.message,
    });
  }
};

// @ desc: Get USERS
// @ route: Get/api/users
const getUsers = async (req, res) => {
  try {
    const getusers = await userModel.find();

    res.json({
      code: 200,
      statusText: "OK",
      msg: "All users",
      data: getusers,
    });
  } catch (err) {
    res.json({
      code: 400,
      msg: err.message,
    });
  }
};

// @ desc: PUT / UPDATE USER
// @ route: Put/api/users
const putUsers = async (req, res) => {
  try {
    res.status(200).json({
      code: 200,
      statusText: "OK",
      msg: `User updated successfully ${req.params.id}`,
    });
  } catch (err) {
    res.json({
      code: 400,
      msg: err.message,
    });
  }
};

// @ desc: DELETE USER
// @ route: Delete/api/users
const deleteUsers = async (req, res) => {
  try {
    res.status(200).json({
      code: 200,
      statusText: "OK",
      msg: `User deleted successfully ${req.params.id}`,
    });
  } catch (err) {
    res.json({
      code: 400,
      msg: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  const {email, password} = req.body
  try {
    const checkUser = await userModel.findOne({
      email,
      password,
    });

    if (!checkUser) {
      res.json({
        statusText: "Bad Request",
        code: 404,
        MIDIMessageEvent: "Invalid Email or Password",
      });
      return;
    }
    res.json({
      code: 200,
      msg: "Login Successful",
      data: checkUser,
    });
  } catch (err) {
    res.json({
      code: 400,
      statusText: "Bad Request",
      msg: err.message,
    });
  }
};




module.exports = {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
  loginUser
};
