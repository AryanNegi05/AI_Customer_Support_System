import express from "express";

import cors from "cors";

import authRoutes from "./routes/authRoutes.js";

import adminRoutes from "./routes/adminRoutes.js";

import chatRoutes from "./routes/chatRoutes.js";
import agentRoutes from "./routes/agentRoutes.js"



const app = express();



// =====================================================
// MIDDLEWARES
// =====================================================

app.use(cors());

app.use(express.json());



// =====================================================
// ROUTES
// =====================================================

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/admin", adminRoutes);

app.use("/api/chat", chatRoutes);
app.use("/api/v1/agent" ,agentRoutes );



// =====================================================
// TEST ROUTE
// =====================================================

app.get("/", (req, res) => {

  res.send(
    "AI Support System Backend Running"
  );

});



export default app;