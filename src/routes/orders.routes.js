import { Router } from "express";
import {createOrderHandler , getOrdersHandler , getOrderByIdHandler} from "../controllers/orders.controllers.js"
import { validateOrder } from "../middlewares/orders.middlware.js";


const ordersRouter = Router()

ordersRouter.post("/order" , validateOrder , createOrderHandler)
ordersRouter.get("/orders" ,  getOrdersHandler)
ordersRouter.get("/orders/:id" , getOrderByIdHandler)

export default ordersRouter