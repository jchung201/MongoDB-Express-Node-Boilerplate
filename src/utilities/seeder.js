require("dotenv").config();
import mongoose from "mongoose";
import "../models/user/user.schema";
import "../models/event/event.schema";
import "../models/match/match.schema";
import "../models/rsvp/rsvp.schema";

const USER = mongoose.model("USER");
const RSVP = mongoose.model("RSVP");
const EVENT = mongoose.model("EVENT");
const MATCH = mongoose.model("MATCH");

// Instantiate db connection
mongoose.connect(process.env.DATABASE, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on("connected", async () => {
  // Drop DB
  for (let collection in mongoose.connection.collections) {
    await mongoose.connection.collections[collection].deleteMany();
  }
  // Create Vendor1
  const newVendor1 = new USER({
    auth: {
      email: "juh@letzb.com",
      password: "let123"
    },
    vendorProfile: {
      name: "Cool Beans",
      location: "New York, NY",
      picture: "www.google.com"
    }
  });
  const savedVendor1 = await newVendor1.save();
  // Create Event1
  const newEvent1 = new EVENT({
    vendor: savedVendor1._id,
    category: "Dance",
    description: "Awesome moonlight.",
    date: {
      start: new Date(),
      end: new Date()
    },
    location: "New York, NY",
    title: "Awesome dance moonlight party.",
    picture: "wwww.google.com"
  });
  const savedEvent1 = await newEvent1.save({});
  // Create Dater1
  const newDater1 = new USER({
    auth: {
      email: "date1@letzb.com",
      password: "let123"
    },
    datingProfile: {
      filters: {
        distance: 5,
        ageLow: 18,
        ageHigh: 22,
        heightLow: 6,
        heightHigh: 7
      },
      name: "Jessica",
      birthDate: new Date(),
      location: "New York",
      description: "Handsome",
      photos: [{ url: "www.google.com", order: 1 }],
      questions: {
        step: 3,
        meet: ["hello"],
        horoscope: "Gemini",
        schedule: ["hello"],
        searching: ["hello"],
        firstDate: ["hello"],
        bodyType: ["hello"],
        loveLanguage: ["hello"],
        lifeStyle: ["hello"],
        sexualPreference: ["hello"],
        relationshipStatus: "hello",
        genderIdentity: "hello",
        tidbit: "hello"
      }
    }
  });
  const savedDater1 = await newDater1.save();
  // Create Dater2
  const newDater2 = new USER({
    auth: {
      email: "date2@letzb.com",
      password: "let123"
    },
    datingProfile: {
      filters: {
        distance: 5,
        ageLow: 18,
        ageHigh: 22,
        heightLow: 6,
        heightHigh: 7
      },
      name: "Sarah",
      birthDate: new Date(),
      location: "New York",
      description: "Handsome",
      photos: [{ url: "www.google.com", order: 1 }],
      questions: {
        step: 3,
        meet: ["hello"],
        horoscope: "Gemini",
        schedule: ["hello"],
        searching: ["hello"],
        firstDate: ["hello"],
        bodyType: ["hello"],
        loveLanguage: ["hello"],
        lifeStyle: ["hello"],
        sexualPreference: ["hello"],
        relationshipStatus: "hello",
        genderIdentity: "hello",
        tidbit: "hello"
      }
    }
  });
  const savedDater2 = await newDater2.save();
  // Match Dater1 to Dater2
  const newMatch = new MATCH({
    users: [savedDater1._id, savedDater2._id],
    status: "matched",
    conversation: [
      {
        user: savedDater1._id,
        message: "Hi"
      }
    ]
  });
  const savedMatch = await newMatch.save();
  // Dater1 RSVP to Event1
  const newRSVP = new RSVP({
    user: savedDater1._id,
    event: savedEvent1._id,
    status: "going"
  });
  const savedRSVP = await newRSVP.save();
  console.log("finished");
});
