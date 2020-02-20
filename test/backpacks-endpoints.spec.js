const knex = require("knex");
const jwt = require("jsonwebtoken");
const app = require("../src/app");

describe("Backpacks Endpoints", function() {
  let db;

  const testUsers = {
    user_name: "test-user-1",
    password: "password"
  };

  const testBackpacks = {};
});

// need test for get all backpacks
//need test for get backpacks by user
// need test for for post backpacks
//need test for patch backpack
// ? need test for delete backpack?
