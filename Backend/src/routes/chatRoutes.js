import express from "express"

import { chat }
from "../controllers/chatController.js"

import authMiddleware
from "../middlewares/authMiddleware.js"

import roleMiddleware
from "../middlewares/roleMiddleware.js"

const router = express.Router()



router.post(
  "/",
  authMiddleware,
  roleMiddleware("customer"),
  chat
)

export default router