import mongoose from "mongoose";
// Import Database Models
import "../models/event/event.schema";
import "../models/match/match.schema";
import "../models/rsvp/rsvp.schema";
import "../models/user/user.schema";

export default () => {
  mongoose.connect(process.env.DATABASE, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  mongoose.connection.on("connected", () => {
    console.log(
      "Mongoose default connection is open to ",
      process.env.DATABASE
    );
  });

  mongoose.connection.on("error", err => {
    console.log("Mongoose default connection has occured " + err + " error");
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose default connection is disconnected");
  });

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log(
        "Mongoose default connection is disconnected due to application termination"
      );
      process.exit(0);
    });
  });
};
