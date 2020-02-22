import mongoose, { Schema } from "mongoose";
import httpErrors from "http-errors";

const userSchema = new Schema(
  {
    auth: {
      hash: { type: String, required: true },
      salt: { type: String, required: true },
      username: { type: String, required: true, unique: true },
      displayUsername: { type: String, required: true, unique: true }
    }
  },
  { timestamps: true }
);

// Require Methods
require("./user.methods")(userSchema);

// Export the model and return your IUser interface
export default mongoose.model("USER", userSchema);
