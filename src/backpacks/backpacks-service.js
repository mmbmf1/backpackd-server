const xss = require("xss");
// const Treeize = require("treeize");

const BackpacksService = {
  getAllBackpacks(db) {
    return db
      .from("backpackd_backpacks AS bp")
      .select(
        "bp.id",
        "bp.name",
        "bp.date_created",
        "bp.useritems",
        "bp.total"
        // ...userFields,
      )
    //   .leftJoin("backpackd_users", "bp.user_id", "user.id");
  },


};

module.exports = BackpacksService;
