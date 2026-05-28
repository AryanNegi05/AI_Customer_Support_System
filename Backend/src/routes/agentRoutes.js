import express from "express"

import {
  getAssignedTickets,
  getSingleTicket,
  updateTicketStatus
} from "../controllers/agentController.js"

import authMiddleware from "../middlewares/authMiddleware.js"
import roleMiddleware from "../middlewares/roleMiddleware.js"

const router = express.Router()



router.get(
  "/tickets",
  authMiddleware,
  roleMiddleware("agent"),
  getAssignedTickets
)

router.get(
  "/tickets/:id",
  authMiddleware,
  roleMiddleware("agent"),
  getSingleTicket
)

router.patch(
  "/tickets/:id/status",
  authMiddleware,
  roleMiddleware("agent"),
  updateTicketStatus
)

export default router