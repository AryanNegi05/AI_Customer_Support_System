import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit"

import * as customerService
from "../services/customerService"



const initialState = {

  tickets: [],

  selectedTicket: null,

  loading: false,

  error: null

}



// =====================================================
// GET CUSTOMER TICKETS
// =====================================================

export const fetchCustomerTickets =
  createAsyncThunk(

    "customer/fetchTickets",

    async (_, thunkAPI) => {

      try {

        return await customerService
          .getCustomerTickets()

      }

      catch (error) {

        return thunkAPI.rejectWithValue(

          error.response?.data?.message

        )

      }

    }

  )



const customerSlice = createSlice({

  name: "customer",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(
        fetchCustomerTickets.pending,
        (state) => {

          state.loading = true

        }
      )

      .addCase(
        fetchCustomerTickets.fulfilled,
        (state, action) => {

          state.loading = false

          state.tickets =
            action.payload.tickets

        }
      )

      .addCase(
        fetchCustomerTickets.rejected,
        (state, action) => {

          state.loading = false

          state.error =
            action.payload

        }
      )

  }

})



export default customerSlice.reducer