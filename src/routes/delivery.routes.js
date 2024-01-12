import express from "express"
import { deliveryData } from "../controller"
import uploads from "../middleware/multer.middleware"
const deliveryRouter = express.Router()

deliveryRouter.post('/add',uploads, deliveryData)

export default deliveryRouter