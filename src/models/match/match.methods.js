import httpErrors from "http-errors";
import MATCH from "./match.schema";

module.exports = function(matchSchema) {
  matchSchema.methods.isOwner = function(id, next) {
    if (this.users.includes(id)) return true;
    return false;
  };
};
