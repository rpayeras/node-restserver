const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/api/users";

    this.connectDb();

    this.middlewares();

    this.routes();
  }

  async connectDb() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(express.static("public"));
    this.app.use(express.json());

    // const corsOptions = {
    //   origin: "http://localhost:3000",
    //   optionsSuccessStatus: 200,
    // };

    this.app.use(cors());
  }

  routes() {
    this.app.use(this.usersPath, require("../routes/users"));
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`Example app listening on port ${this.port}!`)
    );
  }
}

module.exports = Server;
