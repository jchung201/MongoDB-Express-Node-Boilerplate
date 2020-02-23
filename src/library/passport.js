import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import mongoose from "mongoose";
import httpErrors from "http-errors";

const USER = mongoose.model("USER");
import dotenv from "dotenv";
dotenv.config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  secretOrKey: process.env.SECRET
};
passport.use(
  new Strategy(opts, async (jwt_payload, done) => {
    try {
      const foundUser = await USER.findById(jwt_payload._id);
      if (!foundUser) return done(httpErrors(401, "No user found!"));
      done(null, foundUser);
    } catch (error) {
      done(error);
    }
  })
);
export default passport;
