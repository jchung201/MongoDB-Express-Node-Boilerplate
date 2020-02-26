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
        next();
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
  userSchema.methods.updateDater = async function(name, birthDate, location) {
    if (name) this.datingProfile.name = name;
    if (birthDate) this.datingProfile.birthDate = birthDate;
    if (location) this.datingProfile.location = location;
    return await this.save({ new: true });
  };
  userSchema.methods.updateIcons = async function(
    horoscope,
    life,
    love,
    meetMe,
    preference,
    schedule,
    search,
    sexuality,
    status,
    tell
  ) {
    if (horoscope) this.datingProfile.icons.horoscope = horoscope;
    if (life) this.datingProfile.icons.life = life;
    if (love) this.datingProfile.icons.love = love;
    if (meetMe) this.datingProfile.icons.meetMe = meetMe;
    if (preference) this.datingProfile.icons.preference = preference;
    if (schedule) this.datingProfile.icons.schedule = schedule;
    if (search) this.datingProfile.icons.search = search;
    if (sexuality) this.datingProfile.icons.sexuality = sexuality;
    if (status) this.datingProfile.icons.status = status;
    if (tell) this.datingProfile.icons.tell = tell;
    return await this.save({ new: true });
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
  userSchema.methods.updateVendor = async function(name, location, picture) {
    if (name) this.vendorProfile.name = name;
    if (location) this.vendorProfile.location = location;
    if (picture) this.vendorProfile.picture = picture;
    return await this.save({ new: true });
  };
};
