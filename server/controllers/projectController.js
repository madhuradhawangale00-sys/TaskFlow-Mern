const Project = require("../models/Project");
const Workspace = require("../models/Workspace");

// Create Project
const createProject = async (req, res) => {
  try {
    // Get workspace ID from URL
    const { workspaceId } = req.params;

    // Get project details from request body
    const { name, description } = req.body;

    // Check if workspace exists
    const workspace = await Workspace.findById(workspaceId);

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    // Check if logged-in user is a member of the workspace
    const isMember = workspace.members.some(
      (member) => member.toString() === req.user._id.toString()
    );

    if (!isMember) {
      return res.status(403).json({
        success: false,
        message: "You are not a member of this workspace",
      });
    }

    // Create new project
    const project = new Project({
      name,
      description,
      workspace: workspaceId,
      createdBy: req.user._id,
    });

    // Save project
    await project.save();

    // Send success response
    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProject,
};