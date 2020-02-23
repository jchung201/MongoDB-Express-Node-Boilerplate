import mongoose, { Schema } from "mongoose";
const {
  Types: { ObjectId }
} = Schema;

const eventSchema = new Schema(
  {
    owner: { type: ObjectId, ref: "USER" },
    name: String
  },
  { timestamps: true }
);

// Require Methods
require("./event.methods")(eventSchema);

const EVENT = mongoose.model("EVENT", eventSchema);

// Export the model and return your IUser interface
export default EVENT;
