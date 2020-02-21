const knex = require("knex");
const jwt = require("jsonwebtoken");
const app = require("../src/app");

describe("Auth endpoints", function() {
  let db;

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

  const testUser = testUsers[0];

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("clean table", () => db("backpackd_users").truncate());

  afterEach("clean up", () => db("backpackd_users").truncate());

  describe("POST /api/auth/login", () => {
    before("insert user", () => {
      return db("backpackd_users").insert(testUser);
    });

    it(`responds 200 and JWT auth token using secret when valid credentials`, () => {
      const userValidCreds = {
        id: testUser.id,
        user_name: testUser.user_name,
        password: testUser.password
      };

      const expectedToken = jwt.sign(
        { user_id: testUser.id },
        process.env.JWT_SECRET,
        {
          subject: testUser.user_name,
          expiresIn: process.env.JWT_EXPIRY,
          algorithm: "HS256"
        }
      );

      return (
        supertest(app)
          .post("/api/auth/login")
          .send(userValidCreds)
          .expect(200),
        {
          authToken: expectedToken
        }
      );
    });
  });
});
