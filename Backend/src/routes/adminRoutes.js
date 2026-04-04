const express = require("express");
const router = express.Router();
const { createAgent, getAgents } = require("../controllers/adminController");

const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

// admin-only routes
router.post("/create-agent", auth, role("admin"), createAgent);
router.get("/agents", auth, role("admin"), getAgents);

module.exports = router;