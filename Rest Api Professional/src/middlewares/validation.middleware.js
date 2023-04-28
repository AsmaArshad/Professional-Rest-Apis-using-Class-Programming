const DbConnection = require('@db');
let db = new DbConnection().db;

async function checkEmailExists(req, res,next) { 
    var Email = req.body.Email.toLowerCase();
    await db.select().from('tbl_user').where({Email}).then((user_res) => {
        if(user_res.length>=1){
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


async function authenticateUser (req, res, next) {
    var {Email} = req.body;
    await db.select().from('tbl_user').where({Email}).then((user_res) => {
        if(user_res.length<1){
            return res.status(404).json({
                message_type:"error",
                message: "User does not exists"
            })
        }
        req.user = user_res[0];
        next()
    }).catch((err)=> {
        res.json({
            error: err
        })
    })
}


async function checkCustomerEmailExists (req, res,next){ 
    var Email = req.body.Email.toLowerCase();
    await db.select().from('tbl_customer').where({Email}).then((customer_res) => {
        if(customer_res.length>=1){
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
