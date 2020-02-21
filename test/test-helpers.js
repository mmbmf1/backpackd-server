const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function truncateTables(db) {
  return db.raw(`TRUNCATE backpackd_backpacks, backpackd_users`);
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }));
  return db
    .into("backpackd_users")
    .insert(preppedUsers)
    .then(() =>
      db.raw(`SELECT setval('backpackd_users_id_seq', ?)`, [
        users[users.length - 1].id
      ])
    );
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  console.log(user);
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: "HS256"
  });
  return `bearer ${token}`;
}

module.exports = {
  truncateTables,
  seedUsers,
  makeAuthHeader
};
