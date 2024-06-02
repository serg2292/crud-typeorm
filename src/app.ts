import { json } from "body-parser";
import express, { Express } from "express";
import { Server } from "http";
import configService from "./config/config.service";

class App {
  app: Express;
  server: Server;
  host: string;
  port: string;

  constructor() {
    this.app = express();
    this.host = configService.get("HOST");
    this.port = configService.get("PORT");
  }

  useMiddleware() {
    this.app.use(json());
  }

  //   useRoutes() {
  //     this.app.use("/users", this.userController.router);
  //   }
  public async init() {
    this.useMiddleware();
    // this.useRoutes();
    // await this.prismaService.connect();
    this.server = this.app.listen(this.port, () => {
      console.log(`Сервер запущен на http://${this.host}:${this.port}`);
    });
  }

  public close() {
    this.server.close();
  }
}

export default new App();
