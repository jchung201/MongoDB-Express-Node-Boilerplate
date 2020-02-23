// Express instance
import app from "./library/app";

// Router and hooked up controllers
import router from "./library/router";
app.use("/", router);

// Catch 404
import httpErrors from "http-errors";
app.use((req, res, next) => {
  next(httpErrors(404, "Not found!"));
});

// Error handler
import errorHandler from "./middlewares/errorHandler";
app.use(errorHandler);

// Node/Express listener
app.listen(process.env.PORT, function() {
  console.log(`Listening on port ${process.env.PORT}!`);
});
