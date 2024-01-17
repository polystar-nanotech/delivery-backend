import express from "express"
import { delivery, deliveryData } from "../controller"
import uploads from "../middleware/multer.middleware"
const deliveryRouter = express.Router()

deliveryRouter.post('/add',uploads, deliveryData)
deliveryRouter.post('/delivery', delivery)

export default deliveryRouter