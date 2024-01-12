import express from "express"
import deliveryRouter from "./delivery.routes"
import userRouter from "./users.routes"

const mainRouter = express.Router()

mainRouter.use("/delivery", deliveryRouter)
mainRouter.use("/auth", userRouter)

export default mainRouter