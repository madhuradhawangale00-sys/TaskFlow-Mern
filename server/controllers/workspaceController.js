const Workspace = require("../models/Workspace");
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

const getWorkspaces = async (req,res) => {
    res.json({
        message: "Get Workspaces Controller working"
    });
}

module.exports = {createWorkspace,getWorkspaces};