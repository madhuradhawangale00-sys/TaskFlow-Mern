const registerUser = async (req,res) => {
    res.json({
        success: true,
        message: "Register Controller Working",
    });
};

module.exports = { registerUser};