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
      description: String,
      photos: [
        {
          url: String,
          order: Number
        }
      ],
      questions: {
        step: { type: Number, default: 0 },
        meet: [String],
        horoscope: String,
        schedule: [String],
        searching: [String],
        firstDate: [String],
        bodyType: [String],
        loveLanguage: [String],
        lifeStyle: [String],
        sexualPreference: [String],
        relationshipStatus: String,
        genderIdentity: String,
        tidbit: String
      }
    }
  },
  { timestamps: true }
);

// Require Methods
require("./user.methods")(userSchema);

const USER = mongoose.model("USER", userSchema);

// Export the model and return your IUser interface
export default USER;
