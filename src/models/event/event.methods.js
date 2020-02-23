import httpErrors from "http-errors";
import EVENT from "./event.schema";

module.exports = function(eventSchema) {
  eventSchema.methods.isOwner = function(id, next) {
    if (this.owner.equals(id)) return true;
    return false;
  };
};
