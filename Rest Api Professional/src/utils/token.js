var jwt = require('jsonwebtoken');

exports.createToken = (Id, Name, Email) => {
    //jwt sign function use here to generate token
    //payload means custom information pass here for authentication
    //secret key is unique i.e. secret here
   const token = jwt.sign({ Id, Name, Email}, process.env.JWT_SECRET , { expiresIn: "24h" });
   return token;
 }

