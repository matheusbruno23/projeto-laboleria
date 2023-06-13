import {Router} from 'express';
import { createCakeHandler } from '../controllers/cakes.controllers.js';
import { validateCake } from '../middlewares/cakes.middleware.js';

const cakesRouter = Router()


cakesRouter.post("/cakes", validateCake, createCakeHandler)

export default cakesRouter;