const jwt = require("jsonwebtoken");
const protect = (req,res,next) => {
    console.log(req.headers);

    next();
    
}

module.exports = protect;