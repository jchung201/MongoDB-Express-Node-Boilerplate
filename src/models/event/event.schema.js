import mongoose, { Schema } from "mongoose";
const {
  Types: { ObjectId }
} = Schema;

const eventSchema = new Schema(
  {
    vendor: { type: ObjectId, ref: "USER" },
    category: String,
    description: String,
    date: {
      start: Date,
      end: Date
    },
    location: String,
    title: String,
    picture: String
  },
  { timestamps: true }
);

// Require Methods
require("./event.methods")(eventSchema);

const EVENT = mongoose.model("EVENT", eventSchema);

// Export the model and return your IUser interface
export default EVENT;
