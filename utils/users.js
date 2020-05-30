const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, "../data/users.json");

function getUsers() {
  return JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
}

module.exports = {
  getUsers,
  usersFilePath,
};
