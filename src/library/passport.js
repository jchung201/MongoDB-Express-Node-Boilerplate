const passport = require("passport");
const LocalStrategy = require("passport-local");
import mongoose from "mongoose";

const USER = mongoose.model("USER");

passport.use(
  new LocalStrategy(
    {
      passwordField: "password",
      usernameField: "username"
    },
    async (username, password, done) => {
      try {
        const foundUser = await USER.findOne({
          "auth.username": username.toLowerCase()
        });
        if (!foundUser || !foundUser.validatePassword(password)) {
          return done(null, false, {
            errors: { "username or password": "is invalid" }
          });
        }
        return done(null, foundUser);
      } catch (error) {
        done(error);
      }
    }
  )
);
