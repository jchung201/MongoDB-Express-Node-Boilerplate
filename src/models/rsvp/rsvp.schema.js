import mongoose, { Schema } from "mongoose";
const {
  Types: { ObjectId }
} = Schema;

const rsvpSchema = new Schema(
  {
    user: { type: ObjectId, ref: "USER" },
    event: { type: ObjectId, ref: "USER" },
    status: {
      type: String,
      enum: ["going", "passed"],
      default: "going"
    },
    name: String
  },
  { timestamps: true }
);

// Require Methods
require("./rsvp.methods")(rsvpSchema);

const RSVP = mongoose.model("RSVP", rsvpSchema);

// Export the model and return your IUser interface
export default RSVP;
