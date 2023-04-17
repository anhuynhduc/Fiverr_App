import express from "express";
import {getConversations, createConversation, getSingleConversation, updateConversation} from "../controllers/conversation.controller.js";
import {verifyToken} from "../middleware/jwt.js";

const router = express.Router()

router.post("/" , createConversation)
router.get("/single/:id" , getSingleConversation)
router.get("/" , getConversations)
router.put("/:id" , updateConversation)

export default router