const db = require("@db");
const User = db.user;
const Customer = db.customer;

async function checkEmailExists(req, res,next) { 
    var Email = req.body.Email.toLowerCase();
    await User.findOne({ where: { Email}}).then((user_res)=> {
        if(user_res){
            return res.status(409).json({
                message: "Email Already Exists!"
            }) 
        }
        next()
    }).catch((err)=> {
        console.log(err.message);
    })
}


async function authenticateUser (req, res, next) {
    var {Email} = req.body;
    await User.findOne({ where: { Email}}).then((user_res) => {
        if(!user_res){
            return res.status(404).json({
                message_type:"error",
                message: "User does not exists"
            })
        }
        req.user = user_res.dataValues;
        next()
    }).catch((err)=> {
        res.json({
            error: err
        })
    })
}


async function checkCustomerEmailExists (req, res,next){ 
    var Email = req.body.Email.toLowerCase();
    await Customer.findOne({ where: { Email}}).then((customer_res) => {
        if(customer_res){
            return res.status(409).json({
                message: "Email Already Exists!"
            })  
        }
        next()
    }).catch(err=> {
        res.json({
                message: "Something went wrong!",
                error:err
        })
    })
}

module.exports = {checkEmailExists, authenticateUser, checkCustomerEmailExists}
