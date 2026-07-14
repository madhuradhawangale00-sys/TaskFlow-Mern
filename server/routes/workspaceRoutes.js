const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { createWorkspace,getWorkspaces,updateWorkspace } = require("../controllers/workspaceController");

router.post("/",protect, createWorkspace);
router.get("/",protect,getWorkspaces);
router.put("/:id",protect,updateWorkspace);

module.exports = router;