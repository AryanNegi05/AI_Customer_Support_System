import Ticket from "../models/Ticket.js"



// =====================================================
// GET CUSTOMER TICKETS
// =====================================================

export const getCustomerTickets =
  async (req, res) => {

    try {

      const tickets =
        await Ticket.find({

          customerId:
            req.user.id

        })

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
// GET SINGLE CUSTOMER TICKET
// =====================================================

export const getSingleCustomerTicket =
  async (req, res) => {

    try {

      const ticket =
        await Ticket.findOne({

          _id: req.params.id,

          customerId:
            req.user.id

        })

        .populate(
          "assignedAgent",
          "name email"
        )



      if (!ticket) {

        return res.status(404).json({

          success: false,

          message:
            "Ticket not found"

        })

      }



      res.status(200).json({

        success: true,

        ticket

      })

    }

    catch (error) {

      console.log(error)

      res.status(500).json({

        success: false,

        message:
          "Failed to fetch ticket"

      })

    }

}