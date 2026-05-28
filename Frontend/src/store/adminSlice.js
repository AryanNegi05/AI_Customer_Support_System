import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit"

import * as adminService
from "../services/adminService"

const initialState = {

  agents: [],

  tickets: [],

  analytics: null,

  loading: false,

  error: null

}



// =====================================================
// FETCH AGENTS
// =====================================================

export const fetchAgents =
  createAsyncThunk(

    "admin/fetchAgents",

    async (_, thunkAPI) => {

      try {

        return await adminService
          .getAgents()

      }

      catch (error) {

        return thunkAPI.rejectWithValue(

          error.response?.data?.message

        )

      }

    }

  )



// =====================================================
// FETCH ANALYTICS
// =====================================================

export const fetchAnalytics =
  createAsyncThunk(

    "admin/fetchAnalytics",

    async (_, thunkAPI) => {

      try {

        return await adminService
          .getAnalytics()

      }

      catch (error) {

        return thunkAPI.rejectWithValue(

          error.response?.data?.message

        )

      }

    }

  )



// =====================================================
// FETCH TICKETS
// =====================================================

export const fetchAllTickets =
  createAsyncThunk(

    "admin/fetchTickets",

    async (_, thunkAPI) => {

      try {

        return await adminService
          .getAllTickets()

      }

      catch (error) {

        return thunkAPI.rejectWithValue(

          error.response?.data?.message

        )

      }

    }

  )



const adminSlice = createSlice({

  name: "admin",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    builder

      // =============================================
      // AGENTS
      // =============================================

      .addCase(
        fetchAgents.pending,
        (state) => {

          state.loading = true

        }
      )

      .addCase(
        fetchAgents.fulfilled,
        (state, action) => {

          state.loading = false

          state.agents =
            action.payload.agents

        }
      )

      .addCase(
        fetchAgents.rejected,
        (state, action) => {

          state.loading = false

          state.error =
            action.payload

        }
      )



      // =============================================
      // ANALYTICS
      // =============================================

      .addCase(
        fetchAnalytics.fulfilled,
        (state, action) => {

          state.analytics =
            action.payload.analytics

        }
      )



      // =============================================
      // TICKETS
      // =============================================

      .addCase(
        fetchAllTickets.fulfilled,
        (state, action) => {

          state.tickets =
            action.payload.tickets

        }
      )

  }

})



export default adminSlice.reducer