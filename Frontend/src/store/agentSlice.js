import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit"

import * as agentService from "../services/agentService"



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
// GET ASSIGNED TICKETS
// =====================================================

export const fetchAssignedTickets =
  createAsyncThunk(

    "agent/fetchTickets",

    async (_, thunkAPI) => {

      try {

        return await agentService.getAssignedTickets()

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message
        )

      }

    }

  )



// =====================================================
// GET SINGLE TICKET
// =====================================================

export const fetchSingleTicket =
  createAsyncThunk(

    "agent/fetchSingleTicket",

    async (ticketId, thunkAPI) => {

      try {

        return await agentService.getSingleTicket(
          ticketId
        )

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message
        )

      }

    }

  )



// =====================================================
// UPDATE TICKET STATUS
// =====================================================

export const changeTicketStatus =
  createAsyncThunk(

    "agent/changeStatus",

    async ({ ticketId, status }, thunkAPI) => {

      try {

        return await agentService.updateTicketStatus(
          ticketId,
          status
        )

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message
        )

      }

    }

  )



// =====================================================
// SLICE
// =====================================================

const agentSlice = createSlice({

  name: "agent",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    builder

      // FETCH TICKETS
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

          state.error = action.payload

        }
      )



      // SINGLE TICKET
      .addCase(
        fetchSingleTicket.fulfilled,
        (state, action) => {

          state.selectedTicket =
            action.payload.ticket

        }
      )



      // UPDATE STATUS
      .addCase(
        changeTicketStatus.fulfilled,
        (state, action) => {

          state.selectedTicket =
            action.payload.ticket

        }
      )

  }

})



export default agentSlice.reducer