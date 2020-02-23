import expressAsyncHandler from "express-async-handler";
import httpErrors from "http-errors";
import passport from "passport";

const auth = expressAsyncHandler(async (req, res, next) => {
  const {
    headers: { authorization }
  } = req;
  if (authorization && authorization.split(" ")[0] === "JWT") {
    await passport.authenticate(
      "jwt",
      { session: false },
      (error, user, info) => {
        if (error) {
          return next(error);
        }
        if (!user) {
          return next(httpErrors(400, "Sorry, no user found!"));
        }
        req.user = user;
        next();
      }
    )(req, res, next);
  } else {
    return next(httpErrors(400, "Incorrect token!"));
  }
});

export default auth;
