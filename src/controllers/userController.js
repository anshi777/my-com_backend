import AuthModel from "../models/authModel.js";
import { asyncHandler } from "../utils/ayncHandler.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  const user = await AuthModel.find();
  if (!user) {
    res.status(401).json({ success: false, message: "Users not found" });
  }
  res
    .status(200)
    .json({ success: true, message: "sucess to get all users..", user });
});

export const getUserById = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await AuthModel.findById({ _id });

    if (!user) {
      res.status(401).json({ success: false, message: "User Not Found" });
    } else if (!_id) {
      res.status(401).json({ success: false, message: "User ID is Reuired.." });
    }
    return res
      .status(200)
      .json({ success: false, message: "user get successfully..", user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error..",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await AuthModel.deleteOne({ _id });
    if (!_id) {
      res.status(401).json({ success: false, message: "User ID is Reuired.." });
    } else if (!user) {
      res.status(401).json({ success: false, message: "User Not Found" });
    }
    return res
      .status(200)
      .json({ success: false, message: "User Deleted successfully..", user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error..",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id)
      return res
        .status(404)
        .json({ success: false, message: "User ID is required" });

    const updates = { ...req.body };

    if (req.files?.img?.[0]) updates.img = req.files.img[0].path;
    if (req.files?.coverImg?.[0]) updates.coverImg = req.files.coverImg[0].path;

    const user = await AuthModel.findByIdAndUpdate(_id, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};
