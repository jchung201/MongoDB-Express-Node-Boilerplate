import httpErrors from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import USER from "./user.schema";

module.exports = function(userSchema) {
  userSchema.methods.encryptPassword = function(password, next) {
    const user = this;
    bcrypt.genSalt(10, function(error, salt) {
      if (error) throw httpErrors(500, "Error encrypting password");
      bcrypt.hash(password, salt, function(error, hash) {
        if (error) throw httpErrors(500, "Error encrypting password");
        user.auth.password = hash;
        user.save();
      });
    });
  };
  userSchema.methods.signIn = async function(password) {
    const foundUser = await USER.findById(this._id);
    const match = await bcrypt.compare(password, foundUser.auth.password);
    if (match) {
      const jwtScheme = { _id: this._id, email: this.auth.email };
      return jwt.sign(jwtScheme, process.env.SECRET, { expiresIn: "12h" });
    } else {
      throw httpErrors(400, "Incorrect password!");
    }
  };
};
