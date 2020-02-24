import mongoose, { Schema } from "mongoose";
const {
  Types: { ObjectId }
} = Schema;

const rsvpSchema = new Schema(
  {
    user: { type: ObjectId, ref: "USER" },
    event: { type: ObjectId, ref: "EVENT" },
    status: {
      type: String,
      enum: ["going", "interested", "passed"],
      default: "going"
    }
  },
  { timestamps: true }
);

// Require Methods
require("./rsvp.methods")(rsvpSchema);

const RSVP = mongoose.model("RSVP", rsvpSchema);

// Export the model and return your IUser interface
export default RSVP;
