// Express instance
import app from "./library/app";

// Router and hooked up controllers
import router from "./library/router";
app.use("/", router);

// Error handler
import errorHandler from "./middlewares/errorHandler";
app.use(errorHandler);

// Node/Express listener
app.listen(process.env.PORT, function() {
  console.log(`Listening on port ${process.env.PORT}!`);
});
