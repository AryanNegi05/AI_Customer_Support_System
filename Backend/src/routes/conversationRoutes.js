import express from "express"

import authMiddleware from "../middlewares/authMiddleware.js"
import roleMiddleware from "../middlewares/roleMiddleware.js"

import {
  createConversation,
  getConversations,
  getConversation
} from "../controllers/conversationController.js"

const router = express.Router()



router.post(
  "/",
  authMiddleware,
  roleMiddleware("customer"),
  createConversation
)

router.get(
  "/",
  authMiddleware,
  roleMiddleware("customer"),
  getConversations
)

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("customer"),
  getConversation
)

export default router