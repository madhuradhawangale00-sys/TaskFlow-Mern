const User = require("../models/User");
const registerUser = async (req,res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        console.log(req.body);

        res.status(200).json({
         success: true,
          message: "Email is available",
           });
        

    }catch(error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = { registerUser};