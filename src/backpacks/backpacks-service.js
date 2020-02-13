const xss = require("xss");
// const Treeize = require("treeize");

const BackpacksService = {
  getAllBackpacks(db) {
    return db
    .from("backpackd_backpacks AS bp")
    .select('*')
    .where('bp.user_id', '1');
    // .select(
    //   "bp.id",
    //   "bp.name",
    //   "bp.date_created",
    //   "bp.useritems",
    //   "bp.total"
    // )
  },

  getUserBackpacks(db, user_id) {
    return db
      .from('backpackd_backpacks AS bp')
      .select('*')
      .where('bp.user_id', user_id);
  },

  insertBackpack(db, newBackpack) {
    return db
      .insert(newBackpack)
      .into("backpackd_backpacks")
      .returning("*")
      .then(([backpack]) => backpack)
      .then(backpack => BackpacksService.getAllBackpacks(db, backpack.id));
  },

  serializeBackpack(backpack) {
    const { user } = backpack;
    return {
      id: backpack.id,
      name: xss(backpack.name),
      useritems: xss(backpack.useritems),
      total: backpack.total,
      date_created: new Date(backpack.date_created),
      // user: {
      //   id: user.id,
      //   user_name: user.user_name,
      //   first_name: user.first_name,
      //   last_name: user.last_name,
      //   user_email: user.user_email
      // },
    };
  }
};

module.exports = BackpacksService;
