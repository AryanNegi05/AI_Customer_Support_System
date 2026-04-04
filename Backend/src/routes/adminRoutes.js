const express = require("express");
const router = express.Router();
const { createAgent, getAgents } = require("../controllers/adminController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// admin-only routes
router.post("/create-agent", auth, role("admin"), createAgent);
router.get("/agents", auth, role("admin"), getAgents);

module.exports = router;