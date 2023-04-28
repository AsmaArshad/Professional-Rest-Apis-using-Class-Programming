var jwt = require('jsonwebtoken');

function verifyToken(req, res, next){ 
    try
    {
        var token = req.headers.authorization;
        if(token){
            //in headers we have key as Authorization and value as Bearer tokenxyz
            token = token.split(" ")[1]; //we split based on space and on [1] index we get our token
            var decode = jwt.verify(token, process.env.JWT_SECRET); //token verify
            req.userData = decode;  //decoded information we pass in userData
            next()
        }
    }
    catch(error){
        res.status(401).json({                
            error:"InValid Token!"
        })
    }
}

module.exports = verifyToken