const xss = require("xss");

const BackpacksService = {
  getAllBackpacks(db) {
    return db
    .from("backpackd_backpacks AS bp")
    .select('*')
    .where('bp.user_id', '1');
  },

  getUserBackpacks(db, user_name) {
    return db
      .from('backpackd_backpacks AS bp')
      .select('bp.id','bp.name', 'bp.useritems', 'bp.total', 'user_name')
      .join('backpackd_users', 'bp.user_id', '=', 'backpackd_users.id')
      .where('backpackd_users.user_name', user_name);
  },

  insertBackpack(db, newBackpack) {
    // console.log(newBackpack)
    return db
      .insert(newBackpack)
      .into("backpackd_backpacks")
      .returning("*")
      .then(([backpack]) => backpack)
      // .then(backpack => BackpacksService.getUserBackpacks(db, backpack.user_id));
  },

  deleteUserBackpack(db, id) {
    console.log(typeof id)
    
    return db
    .from('backpackd_backpacks')
      .where({ id })
      .delete();
  },

  serializeBackpack(backpack) {
    // console.log(backpack.id)
    return {
      id: backpack.id,
      name: xss(backpack.name),
      useritems: xss(backpack.useritems),
      total: backpack.total,
      date_created: new Date(backpack.date_created),
    };
  }
};

module.exports = BackpacksService;
