import userModel from "../models/user.model.js";

//get the users information
export const getUsers = async (req, res, next) => {
  try { 
    //finding users
    const users = await userModel.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Users not found" });
    next(error);
  }
};

//get the specific user information
export const getUser = async (req, res, next) => {
  try {
    //finding user by id
    const user = await userModel.findById(req.params.id).select("-password");

    if (!user) {
      const error = new Error("User Not Found");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
