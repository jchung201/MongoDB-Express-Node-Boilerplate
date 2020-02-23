import httpErrors from "http-errors";
import RSVP from "./rsvp.schema";

module.exports = function(rsvpSchema) {
  rsvpSchema.methods.isOwner = function(id, next) {
    if (this.user.equals(id)) return true;
    return false;
  };
};
