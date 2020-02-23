import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    type: String,
    auth: {
      password: String,
      email: String
    },
    vendor: {
      name: String
    },
    date: {
      name: String
    }
  },
  { timestamps: true }
);

// Require Methods
require("./user.methods")(userSchema);

const USER = mongoose.model("USER", userSchema);

// Export the model and return your IUser interface
export default USER;
