const users = require("../data/users.json");

const frozenUsers = Object.freeze(users);

export function getUsers() {
  return frozenUsers;
}
