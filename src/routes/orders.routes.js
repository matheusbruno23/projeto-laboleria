import { Router } from "express";
import {createOrderHandler} from "../controllers/orders.controllers.js"
import { validateOrder } from "../middlewares/orders.middlware.js";


const ordersRouter = Router()

ordersRouter.post("/order" , validateOrder , createOrderHandler)
ordersRouter.get("/orders")
ordersRouter.get("/orders/:id")

export default ordersRouter