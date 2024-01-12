import { userModel } from "../../models";
import {
  comparePassword,
  generateToken,
  hashPassword,
} from "../../utils";

// register User
export const RegisterUser = async (req, res) => {
 
    try {
      let checkCustomer = await userModel.findOne({ Email: req.body.Email });
      if (checkCustomer) {
        return res.status(409).json({ message: "Email already exist" });
      }
      let hash = await hashPassword(req.body.Password);

      let newCustomer = await userModel.create({
        ...req.body,
        Password: hash,
      });

      if (!newCustomer) {
        console.log("failed");
        return res.status(403).json({
          message: "Ooops signup failed!! try again later",
        });
      }
      console.log("well done!!");
        return res.status(201).json({
          message: "Signup successfully",
          success: true,
          data: {
            Email: newCustomer.Email,
            fullName: newCustomer.FullNames,
          },
        });
     
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "internal server error",
        error: error.message,
      });
    }
  
};

// end of User registration

// .............................................................................

// ..........................................................................
// User login
export const loginUser = async (req, res) => {
  try {
    let User = await userModel.findOne({ Email: req.body.Email });
    if (!User) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    let comparedPassword = await comparePassword(
      req.body.Password,
      User.Password
    );
    if (!comparedPassword) {
      return res.status(401).json({
        message: "Wrong password",
      });
    }
    let token = generateToken({
      _id: User._id,
      FullName: User.FullName,
    });
    req.headers.authorization = token;
    console.log("token", req.headers.authorization);
    return res.status(200).json({
      message: "Login Successfully",
      access_token: token,
      data: {
        _id: User._id,
        Email: User.Email,
        fullName: User.FullNames,
        Role: User.Role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal server error",
    });
  }
};
// end of login
//   ........................................................................

export const getUserById = async (req, res) => {
  try {
    const id = req.params.userId;
    let User = await userModel.findById(id);
    if (!User) {
      return res.status(404).json({
        message: "User doesn't found",
      });
    }
    res.status(200).json({
      message: "User founded",
      data: User,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

// End of Getting Single User Details
//   ........................................................................
// Getting all Users

// Update User details

export const updateUser = async (req, res) => {
  try {
    const updateId = req.userId;
    console.log("UserId", updateId);
    const newData = req.body;
    const User = await userModel.findByIdAndUpdate(updateId, newData);
    if (User) {
      res.status(200).json({
        status: 200,
        message: "updated well",
        data: User,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// End
// ..........................................................................

// Update User details

// Delete User

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.userId;
    console.log(id);
    let data = await userModel.findByIdAndDelete({ _id: id });
    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully:", data: data });
    console.log("User deleted successfully:", data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};

