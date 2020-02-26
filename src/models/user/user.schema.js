import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    auth: {
      password: String,
      email: String
    },
    vendorProfile: {
      name: String,
      location: String,
      picture: String
    },
    datingProfile: {
      filters: {
        distance: Number,
        ageLow: Number,
        ageHigh: Number,
        heightLow: Number,
        heightHigh: Number
      },
      name: String,
      birthDate: Date,
      location: String,
      photos: [
        {
          url: String,
          order: Number
        }
      ],
      icons: {
        horoscope: String,
        life: String,
        love: String,
        meetMe: String,
        preference: String,
        schedule: String,
        search: String,
        sexuality: String,
        status: String,
        tell: String
      }
    }
  },
  { timestamps: true }
);

userSchema.pre("save", function(next) {
  if (this.isNew) {
    this.auth.email = this.auth.email.toLowerCase();
    this.encryptPassword(this.auth.password, next);
  } else {
    return next();
  }
});

// Require Methods
require("./user.methods")(userSchema);

const USER = mongoose.model("USER", userSchema);

// Export the model and return your IUser interface
export default USER;
