import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit"

import * as agentService
from "../services/agentService"



// =====================================================
// INITIAL STATE
// =====================================================

const initialState = {

  tickets: [],

  selectedTicket: null,

  loading: false,

  error: null

}



// =====================================================
// FETCH ASSIGNED TICKETS
// =====================================================

export const fetchAssignedTickets =
  createAsyncThunk(

    "agent/fetchTickets",

    async (_, thunkAPI) => {

      try {

        return await agentService
          .getAssignedTickets()

      }

      catch (error) {

        return thunkAPI.rejectWithValue(

          error.response?.data?.message

        )

      }

    }

  )



// =====================================================
// FETCH SINGLE TICKET
// =====================================================

export const fetchSingleTicket =
  createAsyncThunk(

    "agent/fetchSingleTicket",

    async (ticketId, thunkAPI) => {

      try {

        return await agentService
          .getSingleTicket(ticketId)

      }

      catch (error) {

        return thunkAPI.rejectWithValue(

          error.response?.data?.message

        )

      }

    }

  )



// =====================================================
// UPDATE STATUS
// =====================================================

export const changeTicketStatus =
  createAsyncThunk(

    "agent/changeStatus",

    async (

      {
        ticketId,
        status,
        resolution
      },

      thunkAPI

    ) => {

      try {

        return await agentService
          .updateTicketStatus(

            ticketId,
            status,
            resolution

          )

      }

      catch (error) {

        return thunkAPI.rejectWithValue(

          error.response?.data?.message

        )

      }

    }

  )



const agentSlice = createSlice({

  name: "agent",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    // =================================================
    // FETCH TICKETS
    // =================================================

    builder

      .addCase(
        fetchAssignedTickets.pending,
        (state) => {

          state.loading = true

        }
      )

      .addCase(
        fetchAssignedTickets.fulfilled,
        (state, action) => {

          state.loading = false

          state.tickets =
            action.payload.tickets

        }
      )

      .addCase(
        fetchAssignedTickets.rejected,
        (state, action) => {

          state.loading = false

          state.error =
            action.payload

        }
      )



    // =================================================
    // FETCH SINGLE
    // =================================================

    builder

      .addCase(
        fetchSingleTicket.pending,
        (state) => {

          state.loading = true

        }
      )

      .addCase(
        fetchSingleTicket.fulfilled,
        (state, action) => {

          state.loading = false

          state.selectedTicket =
            action.payload.ticket

        }
      )

      .addCase(
        fetchSingleTicket.rejected,
        (state, action) => {

          state.loading = false

          state.error =
            action.payload

        }
      )



    // =================================================
    // UPDATE STATUS
    // =================================================

    builder

      .addCase(
        changeTicketStatus.pending,
        (state) => {

          state.loading = true

        }
      )

      .addCase(
        changeTicketStatus.fulfilled,
        (state, action) => {

          state.loading = false

          state.selectedTicket =
            action.payload.ticket



          state.tickets =
            state.tickets.map((ticket) =>

              ticket._id ===
              action.payload.ticket._id

                ? action.payload.ticket

                : ticket

            )

        }
      )

      .addCase(
        changeTicketStatus.rejected,
        (state, action) => {

          state.loading = false

          state.error =
            action.payload

        }
      )

  }

})



export default agentSlice.reducer