const express = require("express");
const cors = require('cors');
const bodyparser = require('body-parser');
require("module-alias/register");
require('dotenv').config();
const db = require("./src/config/db/db");
const Port = process.env.Port;
class App {
  constructor( controllers) {
    this.app = express();
    this.app.use(cors({
        origin: `*`,
        methods:["GET", "POST"]
     }));
    this.app.use(bodyparser.json())
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.syncDatabase();
  }


   listen() {
    this.app.listen(Port, () => {
      console.log(`App listening on the port ${Port}`);
    });
  }

  getServer() {
    return this.app;
  }

  initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  syncDatabase() {
    db.sequelize.sync().then(() => {});    
  }
}

module.exports = App;
