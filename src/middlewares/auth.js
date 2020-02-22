const jwt = require("express-jwt");
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";

const USER = mongoose.model("USER");

export const getCurrentUser = expressAsyncHandler(async (req, res, next) => {
  if (req.payload && req.payload.id) {
    const foundUser = await USER.findById(req.payload.id);
    req.user = foundUser;
  }
  next();
});

export const getTokenFromHeaders = req => {
  const {
    headers: { authorization }
  } = req;

  if (authorization && authorization.split(" ")[0] === "Token") {
    return authorization.split(" ")[1];
  }
  return null;
};

export const auth = {
  required: jwt({
    secret: process.env.secret,
    userProperty: "payload",
    getToken: getTokenFromHeaders
  }),
  optional: jwt({
    secret: process.env.secret,
    userProperty: "payload",
    getToken: getTokenFromHeaders,
    credentialsRequired: false
  }),
  getCurrentUser
};

export default module.exports = auth;
