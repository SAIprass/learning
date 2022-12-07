const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
  let token =req.headers.token;

  if (!token) {
    return res.status(403).send("token is required for authentication");
  }
     jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
        return res.status(403).send("token is not valid");
     }
        req.user = user;
        next();
    });
};

module.exports = {verifyToken};
