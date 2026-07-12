const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { createWorkspace } = require("../controllers/workspaceController");

router.post("/",protect, createWorkspace);

module.exports = router;