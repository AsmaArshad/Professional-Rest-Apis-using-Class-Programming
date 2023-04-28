var { Router } =  require("express");

class Controller {
  constructor(path) {
    this.router = Router();
    this.path = path;
  }
}

module.exports = {Controller}