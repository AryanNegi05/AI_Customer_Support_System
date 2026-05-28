import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit'

import * as authService
from '../services/authService'



const initialState = {

  user: null,

  token:
    localStorage.getItem('token'),

  loading: false,

  error: null,

  isAuthenticated:
    !!localStorage.getItem('token'),

}



// =====================================================
// REGISTER
// =====================================================

export const registerUser =
  createAsyncThunk(

    'auth/register',

    async (
      userData,
      { rejectWithValue }
    ) => {

      try {

        const response =
          await authService.register(
            userData
          )

        localStorage.setItem(
          'token',
          response.token
        )

        return response

      }

      catch (error) {

        return rejectWithValue(

          error.response?.data?.message ||

          'Registration failed'

        )

      }

    }

  )



// =====================================================
// LOGIN
// =====================================================

export const loginUser =
  createAsyncThunk(

    'auth/login',

    async (
      credentials,
      { rejectWithValue }
    ) => {

      try {

        const response =
          await authService.login(
            credentials
          )

        localStorage.setItem(
          'token',
          response.token
        )

        return response

      }

      catch (error) {

        return rejectWithValue(

          error.response?.data?.message ||

          'Login failed'

        )

      }

    }

  )



// =====================================================
// FETCH CURRENT USER
// =====================================================

export const fetchCurrentUser =
  createAsyncThunk(

    'auth/fetchCurrentUser',

    async (_, { rejectWithValue }) => {

      try {

        return await authService
          .getCurrentUser()

      }

      catch (error) {

        return rejectWithValue(

          error.response?.data?.message

        )

      }

    }

  )



// =====================================================
// LOGOUT
// =====================================================

export const logoutUser =
  createAsyncThunk(

    'auth/logout',

    async (_, { rejectWithValue }) => {

      try {

        localStorage.removeItem(
          'token'
        )

        return null

      }

      catch (error) {

        return rejectWithValue(
          'Logout failed'
        )

      }

    }

  )



export const authSlice =
  createSlice({

    name: 'auth',

    initialState,

    reducers: {

      clearError: (state) => {

        state.error = null

      }

    },

    extraReducers: (builder) => {

      builder

        // REGISTER
        .addCase(
          registerUser.pending,
          (state) => {

            state.loading = true

            state.error = null

          }
        )

        .addCase(
          registerUser.fulfilled,
          (state, action) => {

            state.loading = false

            state.user =
              action.payload.user

            state.token =
              action.payload.token

            state.isAuthenticated =
              true

          }
        )

        .addCase(
          registerUser.rejected,
          (state, action) => {

            state.loading = false

            state.error =
              action.payload

          }
        )



        // LOGIN
        .addCase(
          loginUser.pending,
          (state) => {

            state.loading = true

            state.error = null

          }
        )

        .addCase(
          loginUser.fulfilled,
          (state, action) => {

            state.loading = false

            state.user =
              action.payload.user

            state.token =
              action.payload.token

            state.isAuthenticated =
              true

          }
        )

        .addCase(
          loginUser.rejected,
          (state, action) => {

            state.loading = false

            state.error =
              action.payload

          }
        )



        // FETCH CURRENT USER
        .addCase(
          fetchCurrentUser.fulfilled,
          (state, action) => {

            state.user =
              action.payload.user

            state.isAuthenticated =
              true

          }
        )



        // LOGOUT
        .addCase(
          logoutUser.fulfilled,
          (state) => {

            state.user = null

            state.token = null

            state.isAuthenticated =
              false

            state.error = null

          }
        )

    }

  })



export const {
  clearError
} = authSlice.actions

export default authSlice.reducer