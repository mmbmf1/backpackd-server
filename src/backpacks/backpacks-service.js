const xss = require("xss");

const BackpacksService = {
  getAllBackpacks(db) {
    return db
      .from("backpackd_backpacks AS bp")
      .select("*")
      .where("bp.user_id", "1");
  },

  getBackpackById(db, id) {
    return db
      .from("backpackd_backpacks AS bp")
      .select(
        "bp.id",
        "bp.name",
        "bp.useritems",
        "bp.total",
        "bp.date_created",
        "bp.user_id"
      )
      .where("bp.id", id);
  },

  getUserBackpacks(db, user_name) {
    return db
      .from("backpackd_backpacks AS bp")
      .select(
        "bp.date_created",
        "bp.id",
        "bp.name",
        "bp.useritems",
        "bp.total",
        "bp.user_id"
        // "user_name"
      )
      .join("backpackd_users", "bp.user_id", "=", "backpackd_users.id")
      .where("backpackd_users.user_name", user_name);
  },

  insertBackpack(db, newBackpack) {
    return db
      .insert(newBackpack)
      .into("backpackd_backpacks")
      .returning("*")
      .then(([backpack]) => backpack);
  },

  deleteUserBackpack(db, id) {
    return db
      .from("backpackd_backpacks")
      .where({ id })
      .delete();
  },

  updateBackpack(db, id, newBackpackFields) {
    return db
      .from("backpackd_backpacks")
      .where({ id })
      .update(newBackpackFields)
      .returning("*")
      .then(([newBackpackFields]) => newBackpackFields);
  },

  serializeBackpack(backpack) {
    //   id: backpack.id,
    //   name: xss(backpack.name),
    //   useritems: xss(backpack.useritems),
    //   total: backpack.total,
    //   date_created: new Date(backpack.date_created)
    // });
    return {
      id: backpack.id,
      name: xss(backpack.name),
      useritems: backpack.useritems,
      total: backpack.total,
      date_created: new Date(backpack.date_created)
    };
  }
};

module.exports = BackpacksService;
