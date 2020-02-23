import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import mongoose from "mongoose";
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
      if (!foundUser) return done({ error: "No user" });
      done(null, foundUser);
    } catch (error) {
      done(error);
    }
  })
);
export default passport;
