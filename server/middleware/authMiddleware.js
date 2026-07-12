const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    let token;

    console.log("Middleware Started");

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      console.log("Token:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("Decoded:", decoded);

      req.user = await User.findById(decoded.id).select("-password");

      console.log("User:", req.user);

      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "No token",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Token failed",
    });
  }
};

module.exports = protect;