const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
const fileUpload = require("express-fileupload");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.routesConfig = [
      {
        path: "/api/users",
        routePath: "../routes/users",
      },
      {
        path: "/api/auth",
        routePath: "../routes/auth",
      },
      {
        path: "/api/categories",
        routePath: "../routes/categories",
      },
      {
        path: "/api/products",
        routePath: "../routes/products",
      },
      {
        path: "/api/search",
        routePath: "../routes/search",
      },
      {
        path: "/api/uploads",
        routePath: "../routes/uploads",
      },
    ];

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
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );

    // const corsOptions = {
    //   origin: "http://localhost:3000",
    //   optionsSuccessStatus: 200,
    // };

    this.app.use(cors());
  }

  routes() {
    this.routesConfig.forEach((route) => {
      this.app.use(route.path, require(route.routePath));
    });
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`Example app listening on port ${this.port}!`)
    );
  }
}

module.exports = Server;
