const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

//asyncHandler allow handle async errors
const validToken = asyncHandler( async ( req, res, next) => { //next mean the next function will be execute     
    let token;
    let AuthHeader = req.headers.Authorization||req.headers.authorization; //take header of Authorization from req.headers.Authorization of rep.headers.authorization
    // header contain code notice access from client 
    if(AuthHeader && AuthHeader.startsWith("Bearer")){// check out AuthHeader begin with "Bearer" string
        // if yes take the behind string from bearer string to take the token 
        token = AuthHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err){
                res.status(401);
                throw new Error("User is not authorized");
            }
            req.user = decoded.user;
            next();

        });
        if(!token){
            req.status(401);
            throw new Error("User is not authorized");
        }
    }
})

module.exports = validToken;