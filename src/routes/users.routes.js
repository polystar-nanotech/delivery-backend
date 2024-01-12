import express from "express"
import { RegisterUser, loginUser } from "../controller/authentication";
const userRouter = express.Router();

userRouter.post("/signup",RegisterUser)

userRouter.post("/login", loginUser)

export default userRouter