import express from "express"
import { contact } from "../controller"
const contactRouter = express.Router()

contactRouter.post("/contact-us", contact)
export default contactRouter