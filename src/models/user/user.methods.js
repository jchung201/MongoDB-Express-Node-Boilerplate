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
      return true;
    } else {
      throw httpErrors(400, "Incorrect password!");
    }
  };
  userSchema.methods.getJWT = function() {
    const jwtScheme = { _id: this._id, email: this.auth.email };
    return (
      "JWT " + jwt.sign(jwtScheme, process.env.SECRET, { expiresIn: "12h" })
    );
  };
  userSchema.methods.updateDater = async function(
    name,
    birthDate,
    location,
    description
  ) {
    if (name) this.datingProfile.name = name;
    if (birthDate) this.datingProfile.birthDate = birthDate;
    if (location) this.datingProfile.location = location;
    if (description) this.datingProfile.description = description;
    if (photos) this.datingProfile.photos = photos;
    return await this.save();
  };
  userSchema.methods.updateFilter = async function(
    distance,
    ageLow,
    ageHigh,
    heightLow,
    heightHigh
  ) {
    if (distance) this.datingProfile.filters.distance = distance;
    if (ageLow) this.datingProfile.filters.ageLow = ageLow;
    if (ageHigh) this.datingProfile.filters.ageHigh = ageHigh;
    if (heightLow) this.datingProfile.filters.heightLow = heightLow;
    if (heightHigh) this.datingProfile.filters.heightHigh = heightHigh;
    return await this.save({ new: true });
  };
  userSchema.methods.updateVendor = function() {};
};
