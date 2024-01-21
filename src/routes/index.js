import express from "express"
import deliveryRouter from "./delivery.routes"
import userRouter from "./users.routes"
import contactRouter from "./contact.routes"

const mainRouter = express.Router()

mainRouter.use("/delivery", deliveryRouter)
mainRouter.use("/contact", contactRouter)
mainRouter.use("/auth", userRouter)

export default mainRouter