import express from "express"

import {

  createAgent,

  getAgents,

  getAllTickets,

  getAnalytics

} from "../controllers/adminController.js"

import auth
from "../middlewares/authMiddleware.js"

import role
from "../middlewares/roleMiddleware.js"



const router = express.Router()



// =====================================================
// CREATE AGENT
// =====================================================

router.post(

  "/create-agent",

  auth,

  role("admin"),

  createAgent

)



// =====================================================
// GET ALL AGENTS
// =====================================================

router.get(

  "/agents",

  auth,

  role("admin"),

  getAgents

)



// =====================================================
// GET ALL TICKETS
// =====================================================

router.get(

  "/tickets",

  auth,

  role("admin"),

  getAllTickets

)



// =====================================================
// GET ANALYTICS
// =====================================================

router.get(

  "/analytics",

  auth,

  role("admin"),

  getAnalytics

)



export default router