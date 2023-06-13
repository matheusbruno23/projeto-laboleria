import { Router } from "express";
import { createClientHandler  , getClientOrdersHandler } from '../controllers/clients.controllers.js';
import { validateClient } from '../middlewares/clients.middleware.js';

const clientsRouter = Router()

clientsRouter.post("/clients", validateClient, createClientHandler) 
clientsRouter.get("/clients/:id/orders" , getClientOrdersHandler)

export default clientsRouter