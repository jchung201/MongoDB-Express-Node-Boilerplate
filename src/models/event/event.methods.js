import httpErrors from "http-errors";
import EVENT from "./event.schema";

module.exports = function(eventSchema) {
  eventSchema.methods.isOwner = function(id, next) {
    if (this.owner.equals(id)) return true;
    return false;
  };
  eventSchema.methods.updateEvent = async function(
    category,
    description,
    start,
    end,
    location,
    title,
    picture
  ) {
    if (category) this.category = category;
    if (description) this.description = description;
    if (start) this.date.start = start;
    if (end) this.date.end = end;
    if (location) this.location = location;
    if (title) this.title = title;
    if (picture) this.picture = picture;

    return await this.save({ new: true });
  };
};
