const App = require("./app");
var http = require('http');
var { controllers } = require("./src/controllers");
const Controllers = controllers();
const app = new App([...Controllers]);
const server = http.createServer(app.app);
var Port = process.env.Port;
server.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});

module.exports = server;