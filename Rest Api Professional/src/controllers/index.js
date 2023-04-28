var UserController = require("./user.controller");
var ProductController = require("./product.controller");

exports.controllers = () => {
    return [
        new UserController(),
        new ProductController()
      ];
};
  