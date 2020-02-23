import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";

// Database Connection
import database from "./database";

// Passport authetication
import passport from "./passport";

class App {
  constructor() {
    this.app = express();
    this.config();
    this.database();
  }

  config() {
    this.app.enable("trust proxy");
    this.app.use(cors());
    this.app.options("*", cors());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(morgan(process.env.LOGGER));
    this.app.use(passport.initialize());
  }
  database() {
    database();
  }
}

export default new App().app;
