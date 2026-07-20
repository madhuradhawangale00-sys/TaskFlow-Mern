const Workspace = require("../models/Workspace");
const User = require("../models/User");
const createWorkspace = async (req, res) => {
    try{
        const { name, description} = req.body;

        const workspace = await Workspace.create({
            name,
            description,
            owner: req.user._id,
            members: [ req.user._id]
        });
        res.status(201).json({
            success: true,
            message: "Workspace created successfully",
            workspace
        });

    }catch(error){
        res.status(500).json({
            success:true,
            message: error.message
        });
    }
}

const getWorkspaces = async (req, res) => {
  try {

    const workspaces = await Workspace.find({
      members: req.user._id,
    }).populate("owner","name email").sort({createdAt: -1});

    res.status(200).json({
      success: true,
      workspaces,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const updateWorkspace = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const workspace = await Workspace.findById(id);

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    if (workspace.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this workspace",
      });
    }

    if (name) workspace.name = name;
    if (description) workspace.description = description;

    await workspace.save();

    return res.status(200).json({
      success: true,
      message: "Workspace updated successfully",
      workspace,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    // Find the workspace
    const workspace = await Workspace.findById(id);

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    // Only the workspace owner can add members
    if (workspace.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only the workspace owner can add members",
      });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if the user is already a member
    const isMember = workspace.members.some(
      (member) => member.toString() === user._id.toString()
    );

    if (isMember) {
      return res.status(400).json({
        success: false,
        message: "User is already a member",
      });
    }

    // Add the user to the members array
    workspace.members.push(user._id);

    // Save the workspace
    await workspace.save();

    return res.status(200).json({
      success: true,
      message: "Member added successfully",
      workspace,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteWorkspace = async (req, res) => {
  try {
    const { id } = req.params;

    const workspace = await Workspace.findById(id);

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    // Only the owner can delete
    if (workspace.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only the workspace owner can delete this workspace",
      });
    }

    await Workspace.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Workspace deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



module.exports = {createWorkspace,getWorkspaces,updateWorkspace,addMember,deleteWorkspace};