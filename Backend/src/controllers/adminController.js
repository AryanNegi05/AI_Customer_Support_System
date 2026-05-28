import bcrypt from "bcrypt"

import User from "../models/userModel.js"

import Ticket from "../models/Ticket.js"



// =====================================================
// CREATE AGENT
// =====================================================

const createAgent =
  async (req, res) => {

    try {

      const {
        name,
        email,
        password,
        skills
      } = req.body



      if (
        !name ||
        !email ||
        !password ||
        !skills
      ) {

        return res.status(400).json({

          message:
            "All fields are required"

        })

      }



      const existingUser =
        await User.findOne({
          email
        })



      if (existingUser) {

        return res.status(400).json({

          message:
            "Email already registered"

        })

      }



      const validSkills = [

        "network_issue",

        "billing_issue",

        "login_problem",

        "payment_issue",

        "technical_bug"

      ]



      const invalidSkills =
        skills.filter(

          (s) =>
            !validSkills.includes(s)

        )



      if (invalidSkills.length > 0) {

        return res.status(400).json({

          message:
            `Invalid skills: ${invalidSkills.join(", ")}`

        })

      }



      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        )



      const agent =
        await User.create({

          name,

          email,

          password:
            hashedPassword,

          role: "agent",

          skills

        })



      res.status(201).json({

        success: true,

        message:
          "Agent created successfully",

        agent: {

          id: agent._id,

          name: agent.name,

          email: agent.email,

          role: agent.role,

          skills: agent.skills

        }

      })

    }

    catch (error) {

      console.error(
        "createAgent error:",
        error
      )

      res.status(500).json({

        success: false,

        message:
          "Server error"

      })

    }

}



// =====================================================
// GET ALL AGENTS
// =====================================================

const getAgents =
  async (req, res) => {

    try {

      const agents =
        await User.find({

          role: "agent"

        })

        .select("-password")



      res.status(200).json({

        success: true,

        count: agents.length,

        agents

      })

    }

    catch (error) {

      console.error(
        "getAgents error:",
        error
      )

      res.status(500).json({

        success: false,

        message:
          "Server error"

      })

    }

}



// =====================================================
// GET ALL TICKETS
// =====================================================

const getAllTickets =
  async (req, res) => {

    try {

      const tickets =
        await Ticket.find()

        .populate(
          "customerId",
          "name email"
        )

        .populate(
          "assignedAgent",
          "name email"
        )

        .sort({
          createdAt: -1
        })



      res.status(200).json({

        success: true,

        tickets

      })

    }

    catch (error) {

      console.log(error)

      res.status(500).json({

        success: false,

        message:
          "Failed to fetch tickets"

      })

    }

}



// =====================================================
// ADMIN ANALYTICS
// =====================================================

const getAnalytics =
  async (req, res) => {

    try {

      const totalTickets =
        await Ticket.countDocuments()

      const resolvedTickets =
        await Ticket.countDocuments({

          status: "resolved"

        })

      const openTickets =
        await Ticket.countDocuments({

          status: "open"

        })

      const assignedTickets =
        await Ticket.countDocuments({

          status: "assigned"

        })

      const inProgressTickets =
        await Ticket.countDocuments({

          status: "in_progress"

        })

      const totalAgents =
        await User.countDocuments({

          role: "agent"

        })

      const totalCustomers =
        await User.countDocuments({

          role: "customer"

        })



      res.status(200).json({

        success: true,

        analytics: {

          totalTickets,

          resolvedTickets,

          openTickets,

          assignedTickets,

          inProgressTickets,

          totalAgents,

          totalCustomers

        }

      })

    }

    catch (error) {

      console.log(error)

      res.status(500).json({

        success: false,

        message:
          "Failed to fetch analytics"

      })

    }

}



export {

  createAgent,

  getAgents,

  getAllTickets,

  getAnalytics

}