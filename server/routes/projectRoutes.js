const express = require("express");
const router = express.Router();

const {createProject } = require("../controllers/projectController");
const authMiddleware = require("../middleware/authMiddleware");
const { route } = require("./workspaceRoutes");

router.post("/:workspaceId", authMiddleware, createProject);

module.exports = router;