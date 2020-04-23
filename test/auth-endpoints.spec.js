const knex = require("knex");
const jwt = require("jsonwebtoken");
const app = require("../src/app");

describe("Auth endpoints", function () {
  let db;

  const testUsers = [
    {
      id: 1,
      user_name: "testuser1",
      first_name: "test",
      last_name: "user",
      user_email: "testuser1@mail.com",
      password: "P@ssw0rd",
    },
  ];

  const testUser = testUsers[0];
  let authToken;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("clean table", () => db.raw("TRUNCATE TABLE backpackd_users"));

  beforeEach("register and login user", (done) => {
    supertest(app)
      .post("/api/users")
      .send(testUser)
      .then((registeredUser) => {
        const { user_name, password } = testUser;
        supertest(app)
          .post("/api/auth/login")
          .send({ user_name, password })
          .then((res) => {
            authToken = res.body.authToken;
            done();
          });
      });
  });

  afterEach("clean up", () => db("backpackd_users").truncate());

  describe("POST /api/auth/login", () => {
    it("returns true", () => {
      supertest(app).post("/api/users").expect(400);
    });
  });
});
