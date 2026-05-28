import Ticket from "../models/Ticket.js"



// =====================================================
// GET ASSIGNED TICKETS
// =====================================================

export const getAssignedTickets = async (req, res) => {

  try {

    const tickets = await Ticket.find({
      assignedAgent: req.user.id
    })
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      tickets
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      success: false,
      message: "Failed to fetch tickets"
    })

  }

}



// =====================================================
// GET SINGLE TICKET
// =====================================================

export const getSingleTicket = async (req, res) => {

  try {

    const ticket = await Ticket.findById(
      req.params.id
    )

    if (!ticket) {

      return res.status(404).json({
        success: false,
        message: "Ticket not found"
      })

    }

    res.status(200).json({
      success: true,
      ticket
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      success: false,
      message: "Failed to fetch ticket"
    })

  }

}



// =====================================================
// UPDATE TICKET STATUS
// =====================================================

export const updateTicketStatus = async (req, res) => {

  try {

    const { status } = req.body

    const ticket = await Ticket.findById(
      req.params.id
    )

    if (!ticket) {

      return res.status(404).json({
        success: false,
        message: "Ticket not found"
      })

    }

    ticket.status = status

    if (status === "resolved") {
      ticket.resolvedAt = new Date()
    }

    await ticket.save()

    res.status(200).json({
      success: true,
      ticket
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      success: false,
      message: "Failed to update status"
    })

  }

}