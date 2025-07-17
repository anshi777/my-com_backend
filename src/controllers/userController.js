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
    const { _id } = req.params
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
    res
      .status(500)
      .json({ success: false, message: "internal server error.." ,data:error });
  }
};

export const deleteUser = async(req,res)=>{
    try {
        const {_id} = req.params;
        const user = await AuthModel.deleteOne({_id});
        if(!_id){
        res.status(401).json({ success: false, message: "User ID is Reuired.." });   
        }
        else if(!user){
        res.status(401).json({ success: false, message: "User Not Found" });
        }
        return res
      .status(200)
      .json({ success: false, message: "User Deleted successfully..", user });
        
    } catch (error) {
       res
      .status(500)
      .json({ success: false, message: "Internal server error.." ,data:error });  
    }
}

export const updateUser = async(req,res)=>{
try {
    const {_id} = req.params;
    // const  updatedUser ={ name,email,password}
    const  updatedUser = req.body;
    const user = await AuthModel.findByIdAndUpdate(_id,updatedUser,{new:true,runValidators:true});
    if (!user) {
      res.status(401).json({ success: false, message: "User Not Found" });
    } else if (!_id) {
      res.status(401).json({ success: false, message: "User ID is Reuired.." });
    } else if(!updatedUser){
      res.status(401).json({ success: false, message: "Please Add Valid Fields only.." });
    }

    return res
    .status(200)
    .json({success:false,mes:'User Updated Successfully...',updateUser})
    
} catch (error) {
     res
      .status(500)
      .json({ success: false, message: "Internal server error.." ,data:error });  
}
}