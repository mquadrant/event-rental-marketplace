const users = require("../data/users.json");

const frozenUsers = Object.freeze(users);

module.exports.getUsers = function getTrips() {
  return frozenUsers;
};
