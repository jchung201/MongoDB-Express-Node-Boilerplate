import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";

module.exports = function(userSchema) {
  userSchema.methods.setPassword = function(password) {
    this.auth.salt = crypto.randomBytes(16).toString("hex");
    this.auth.hash = crypto
      .pbkdf2Sync(password, this.auth.salt, 10000, 512, "sha512")
      .toString("hex");
  };
  userSchema.methods.validatePassword = function(password) {
    const hash = crypto
      .pbkdf2Sync(password, this.auth.salt, 10000, 512, "sha512")
      .toString("hex");
    return this.auth.hash === hash;
  };
  userSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
    return jsonwebtoken.sign(
      {
        username: this.auth.username,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10)
      },
      process.env.secret
    );
  };
  userSchema.methods.toAuthJSON = function() {
    return {
      _id: this._id,
      username: this.auth.username,
      token: this.generateJWT()
    };
  };
};
