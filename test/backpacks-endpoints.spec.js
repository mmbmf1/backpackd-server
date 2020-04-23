const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe("Backpacks Endpoints", function () {
  let db;

  const testBackpack = [
    {
      id: 1,
      name: "test-backpack-1",
      useritems: {},
      total: "35",
      user_id: 1,
      date_created: "2029-01-22T16:28:32.615Z",
    },
  ];

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

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("clean table", () => db("backpackd_backpacks").truncate());

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

  afterEach("clean up", () => db("backpackd_backpacks").truncate());

  describe("GET /api/backpacks", () => {
    context(`Given no backpacks`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app).get("/api/backpacks").expect(200, []);
      });
    });

    context(`Given there are backpacks in the database`, () => {
      beforeEach("insert backpacks", () => {
        return db.into("backpackd_backpacks").insert(testBackpack);
      });
      it(`responds with 200 and all of the backpacks`, () => {
        return supertest(app).get("/api/backpacks").expect(200, testBackpack);
      });
    });
  });

  describe(`GET /api/backpacks/:user_name`, () => {
    beforeEach("insert backpacks", () => {
      return db.into("backpackd_backpacks").insert(testBackpack);
    });
    it(`responds 200 with the user backpacks`, () => {
      const user_name = "testuser1";
      const expectedBackpack = testBackpack;

      return supertest(app)
        .get(`/api/backpacks/${user_name}`)
        .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
        .expect(200, expectedBackpack);
    });
  });

  describe(`GET /api/backpacks/edit/:backpack_id`, () => {
    beforeEach("insert backpacks", () => {
      return db.into("backpackd_backpacks").insert(testBackpack);
    });
    it(`responds 200 with the backpack`, () => {
      const backpack_id = 1;
      const expectedBackpack = testBackpack;

      return supertest(app)
        .get(`/api/backpacks/edit/${backpack_id}`)
        .expect(200, expectedBackpack);
    });
  });

  describe(`POST /backpacks`, () => {
    it(`creates a new backpack and responds with 201`, () => {
      const newBackpack = {
        name: "new-backpack",
        useritems: {},
        total: 35,
        user_id: 1,
      };

      return supertest(app)
        .post("/api/backpacks")
        .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
        .send(newBackpack)
        .expect(201);
    });
  });

  describe(`PATCH /:backpack_id`, () => {
    beforeEach("insert backpacks", () => {
      return db.into("backpackd_backpacks").insert(testBackpack);
    });

    it("responds with 204 and updates the backpack", () => {
      const backpackToUpdate = 1;
      const updateBackpack = {
        name: "test backpack 99",
      };

      return supertest(app)
        .patch(`/api/backpacks/${backpackToUpdate}`)
        .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
        .send(updateBackpack)
        .expect(201);
    });
  });

  describe(`DELETE /api/backpacks/:backpackd_id`, () => {
    beforeEach("insert backpack", () => {
      return db.into("backpackd_backpacks").insert(testBackpack);
    });

    it(`responds with 204 and removes the backpack`, () => {
      const backpackToRemove = 1;
      const expectedBackpack = testBackpack.filter(
        (backpack) => backpack.id !== backpackToRemove
      );

      return supertest(app)
        .delete(`/api/backpacks/${backpackToRemove}`)
        .expect(204)
        .then((res) =>
          supertest(app).get(`/api/backpacks`).expect(expectedBackpack)
        );
    });
  });
});
