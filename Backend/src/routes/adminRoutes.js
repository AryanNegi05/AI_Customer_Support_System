import express from "express";

import {

  createAgent,

  getAgents

} from "../controllers/adminController.js";

import auth from "../middlewares/authMiddleware.js";

import role from "../middlewares/roleMiddleware.js";



const router = express.Router();



// =====================================================
// ADMIN ROUTES
// =====================================================

router.post(

  "/create-agent",

  auth,

  role("admin"),

  createAgent

);

router.get(

  "/agents",

  auth,

  role("admin"),

  getAgents

);



export default router;