import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit'

import * as chatService
from '../services/chatService'

const initialState = {

  messages: [],

  loading: false,

  error: null,

  conversationId: null

}

export const sendChatMessage =
  createAsyncThunk(

    'chat/sendMessage',

    async (data, thunkAPI) => {
      try {
        return await chatService
          .sendMessage(data)

      }

      catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message
        )

      }

    }

)

const chatSlice = createSlice({

  name: 'chat',

  initialState,

  reducers: {

    clearChat: (state) => {

      state.messages = []

      state.conversationId = null

    }

  },

  extraReducers: (builder) => {

    builder

      .addCase(
        sendChatMessage.pending,
        (state) => {

          state.loading = true

        }
      )

      .addCase(
        sendChatMessage.fulfilled,
        (state, action) => {

          state.loading = false

          state.messages.push({

            sender: 'bot',

            message:
              action.payload.reply

          })

          if (
            action.payload.conversationId
          ) {

            state.conversationId =
              action.payload.conversationId

          }

        }
      )

      .addCase(
        sendChatMessage.rejected,
        (state, action) => {

          state.loading = false

          state.error = action.payload

        }
      )

  }

})

export const {
  clearChat
} = chatSlice.actions

export default chatSlice.reducer