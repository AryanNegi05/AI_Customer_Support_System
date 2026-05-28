import express from "express"

import authMiddleware
from "../middlewares/authMiddleware.js"

import roleMiddleware
from "../middlewares/roleMiddleware.js"

import {

  getCustomerTickets,

  getSingleCustomerTicket

} from "../controllers/customerController.js"



const router = express.Router()



// =====================================================
// GET ALL CUSTOMER TICKETS
// =====================================================

router.get(

  "/tickets",

  authMiddleware,

  roleMiddleware("customer"),

  getCustomerTickets

)



// =====================================================
// GET SINGLE CUSTOMER TICKET
// =====================================================

router.get(

  "/tickets/:id",

  authMiddleware,

  roleMiddleware("customer"),

  getSingleCustomerTicket

)



export default router