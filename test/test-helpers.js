const bcrypt = require("bcryptjs");

function cleanTables(db) {
  return db.transaction(trx =>
    trx
      .raw(
        `TRUNCATE
        backpackd_backpacks,
        backpackd_users,
      `
      )
      .then(() =>
        Promise.all([
          trx.raw(
            `ALTER SEQUENCE backpackd_backpacks_id_seq minvalue 0 START WITH 1`
          ),
          trx.raw(
            `ALTER SEQUENCE backpackd_users_id_seq minvalue 0 START WITH 1`
          ),
          trx.raw(`SELECT setval('backpackd_backpacks_id_seq', 0)`),
          trx.raw(`SELECT setval('backpackd_users_id_seq', 0)`)
        ])
      )
  );
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

module.exports = {
  cleanTables,
  seedUsers
};
