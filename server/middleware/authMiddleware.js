const jwt = require("jsonwebtoken");
const protect = (req,res,next) => {

    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        token = req.headers.authorization.split(" ")[1];

        console.log(token);
        
    }

    next();
    
};

module.exports = protect;