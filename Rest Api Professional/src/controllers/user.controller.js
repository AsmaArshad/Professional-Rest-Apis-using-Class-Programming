
const {checkEmailExists, authenticateUser, checkCustomerEmailExists} = require('@app/middlewares/validation.middleware.js');

var { Controller} = require("@app/interfaces");
const bcrypt = require('bcrypt');
const utils = require("@utils/token.js");
const password = require("@utils/passwordHash.js");
const DbConnection = require('@db');
let db = new DbConnection().db;

class UserController extends Controller{
  constructor() {
    super("/auth");
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(`${this.path}/registerUser`,checkEmailExists, this.register);

    // authenticateUser for verify token middleware
    this.router.post( `${this.path}/login`,authenticateUser ,this.login);

    this.router.post(`${this.path}/AddCustomer`, checkCustomerEmailExists ,this.AddCustomer)
  }

    async register(req, res){
      var {Name, Password} = req.body;
      var Email = req.body.Email.toLowerCase();
      if(Password != undefined)
      {
          let hashPassword = await password.generateHashPswd(Password, 10);
          if(hashPassword != undefined){
              await db('tbl_user').insert({ Name, Email, Password: hashPassword}).then((user_res) => {
                  return res.status(201).json({
                      message_type:"success",
                      message: "User Registered Successfully!",
                  })
              })
              .catch((err)=> {
                  res.json(err.message);
              })
          }
      }
  } 
  
    async login(req, res) {  
      var { Password } = req.body;
      var user = req.user;
      bcrypt.compare( Password, user.Password, async(err, result)=>{
          if(err){
              res.status(401).json({
                  message_type:"error",
                  message:"Auth Failed"
              })
          }
                  
          if(result){                      
              var token = await utils.createToken(user.Id, user.Name, user.Email);
              res.status(200).json({
                  message_type:"success",
                  message: 'User Login Successfully!',
                  token: token
              })
          }
          else
          {
              res.status(401).json({
                  message_type:"error",
                  message:"Auth Failed"
              })
          }
      })
  }

    async AddCustomer(req, res){
      var { Name, Password } = req.body;
      var Email = req.body.Email.toLowerCase();
      if(Password != undefined)
      {
          let hashPassword = await password.generateHashPswd(Password, 10);
          if(hashPassword != undefined)
          { 
              await db('tbl_customer').insert({ Name, Email, Password: hashPassword}).then((customer_res) => {
                  return res.status(201).json({
                      message_type:"success",
                      message: "Customer Added Successfully!",     
                  })
              })
              .catch((err)=> {
                  res.json(err.message);
              })
          }
      }
  }
  
}

module.exports = UserController;