import express from "express";
import {createOrders,getOrders} from "../controllers/order.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router()

router.post("/:gigId" ,verifyToken, createOrders)
router.get("/:buyerId" , getOrders)

export default router