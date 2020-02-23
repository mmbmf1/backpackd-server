const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe("Users Endpoints", function() {
  let db;
  const testUsers = [
    {
      id: 1,
      user_name: "testuser1",
      first_name: "test",
      last_name: "user",
      user_email: "testuser1@mail.com",
      password: "P@ssw0rd"
    }
  ];

  const testUser = testUsers[0];

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("clean table", () => db.raw("TRUNCATE TABLE backpackd_users"));

  afterEach("clean up", () => db("backpackd_users").truncate());

  it("registers a new user", () => {
    supertest(app)
      .post(`/api/users`)
      .send(testUser)
      .expect(204);
  });
});
