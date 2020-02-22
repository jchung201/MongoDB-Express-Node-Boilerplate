import dotenv from "dotenv";
// Setup .env process.env.VARIABLES
dotenv.config();
import express from "express";
import cors from "cors";
import expressSession from "express-session";
import morgan from "morgan";
import bodyParser from "body-parser";

// Database Connection
import database from "./database";
// Import Database Models
import "../models/user/user.schema";

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
    this.app.use(
      expressSession({
        secret: process.env.secret,
        cookie: { maxAge: 60000 },
        resave: false,
        saveUninitialized: false
      })
    );
    this.app.use(morgan(process.env.LOGGER));
  }
  database() {
    database();
  }
}

export default new App().app;
