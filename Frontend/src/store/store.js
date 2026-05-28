import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import agentReducer from "./agentSlice"
import chatReducer from './chatSlice'
import customerReducer from "./customerSlice"
import adminReducer from "./adminSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    agent: agentReducer,
    chat: chatReducer,
    customer: customerReducer,
    admin: adminReducer,
  },
})