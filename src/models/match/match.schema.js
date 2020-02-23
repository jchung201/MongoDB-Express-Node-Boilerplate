import mongoose, { Schema } from "mongoose";
const {
  Types: { ObjectId }
} = Schema;

const matchSchema = new Schema(
  {
    users: [{ type: ObjectId, ref: "USER" }],
    status: String
  },
  { timestamps: true }
);

// Require Methods
require("./match.methods")(matchSchema);

const MATCH = mongoose.model("MATCH", matchSchema);

// Export the model and return your IUser interface
export default MATCH;
