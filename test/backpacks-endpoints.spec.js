const knex = require("knex");
const jwt = require("jsonwebtoken");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe.skip("Backpacks Endpoints", function() {
  let db;

  const testBackpack = [
    {
      id: 1,
      name: "test-backpack-1",
      useritems: {},
      total: "35",
      user_id: 1,
      date_created: "2029-01-22T16:28:32.615Z"
    }
  ];

  const testUsers = [
    {
      id: 1,
      user_name: "testuser2",
      first_name: "test",
      last_name: "user",
      user_email: "testuser2@mail.com",
      password: "password"
    }
  ];

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("clean table", () => db("backpackd_backpacks").truncate());

  afterEach("clean up", () => db("backpackd_backpacks").truncate());

  describe("GET /api/backpacks", () => {
    context(`Given no backpacks`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get("/api/backpacks")
          .expect(200, []);
      });
    });

    context(`Given there are backpacks in the database`, () => {
      beforeEach("insert backpacks", () => {
        return db.into("backpackd_backpacks").insert(testBackpack);
      });
      it(`responds with 200 and all of the backpacks`, () => {
        return supertest(app)
          .get("/api/backpacks")
          .expect(200, testBackpack);
      });
    });
  });

  describe(`GET /api/backpacks/:user_name`, () => {
    beforeEach("insert backpacks", () => {
      return db.into("backpackd_backpacks").insert(testBackpack);
    });
    it(`responds 200 with the user backpacks`, () => {
      const user_name = "testuser2";
      const expectedBackpack = testBackpack;

      return supertest(app)
        .get(`/api/backpacks/${user_name}`)
        .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
        .expect(200, expectedBackpack);
    });
  });
});
