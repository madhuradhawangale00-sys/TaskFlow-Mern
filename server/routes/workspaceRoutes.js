const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { createWorkspace,getWorkspaces,updateWorkspaces } = require("../controllers/workspaceController");

router.post("/",protect, createWorkspace);
router.get("/",protect,getWorkspaces);
router.put("/:id",protect,updateWorkspaces);

module.exports = router;