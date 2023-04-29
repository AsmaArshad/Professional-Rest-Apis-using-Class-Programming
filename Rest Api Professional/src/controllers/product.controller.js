
//const {verifyToken} = require('@app/middlewares/auth.middleware.js');
const {verifyToken} = require('../../src/middlewares');
const db = require("@db");
const Product = db.product;
var { Controller} = require("@app/interfaces");
class ProductController extends Controller{
  constructor() {
    super("/products");
    this.initializeRoutes();
  }

    initializeRoutes() {
        this.router.post(`${this.path}/addProduct`,verifyToken, this.AddProduct);

        this.router.get(`${this.path}/viewProduct`,verifyToken, this.ViewProduct);

        //this.router.post(`${this.path}/sales`, this.AddSales);
    }

    async AddProduct(req, res) {
        //UserData we get when we decode the token which is in auth.js
        var UserId = req.userData.Id;
        var {Title, Price} = req.body;
        const data = {Title, Price, UserId};
        await Product.create(data).then((product_res) => {
            res.status(201).json({
                message_type:"success",
                message: `Product Added Successfully!`,
            })
        }).catch((err)=> {
            res.json({
                message_type:"error",
                message:err
            });
        })
    }

    async ViewProduct(req, res){
        var UserId = req.userData.Id;
        await Product.findAll({ where: { UserId }}).then((product_res) => {
            if(product_res.length>=1){
                res.status(201).json({
                    message_type:"success",
                    data: product_res
                })
            }
            else{
                res.status(404).json({
                message_type:"success",
                message: "No Product Found"
                })
            }
        }).catch((err)=> {
            res.json({
                message_type:"error",
                message:err
            });
        })
    }

    /*async AddSales(req, res){
        var {productId, customerId, price, quantity} = req.body;
        await db('tbl_sales').insert({productId, customerId, price, quantity}).then((sales_res) => {
            res.status(201).json({
                message_type:"success",
                message:"Added Succesfully!"
            })
        }).catch((err)=> {
            res.json({
                message_type:"error",
                message:err
            });
        })
    }*/
}

module.exports = ProductController;