const xss = require("xss");
const bcrypt = require("bcryptjs");

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

const UsersService = {
  hasUserWithEmail(db, user_email) {
    return db("backpackd_users")
      .where({ user_email })
      .first()
      .then(email => !!email);
  },

  hasUserWithUserName(db, user_name) {
    return db("backpackd_users")
      .where({ user_name })
      .first()
      .then(user => !!user);
  },

  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into("backpackd_users")
      .returning("*")
      .then(([user]) => user);
  },

  validatePassword(password) {
    if (password.length < 8) {
      return "Password must be longer than 8 characters";
    }

    if (password.length > 72) {
      return "Password must be less than 72 characters";
    }

    if (password.startsWith(" ") || password.endsWith(" ")) {
      return "Password must not start not end with empty spaces";
    }

    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return "Password must contain 1 upper case, lower case, number and special character";
    }

    return null;
  },

  hashPassword(password) {
    return bcrypt.hash(password, 12);
  },

  serializeUser(user) {
    return {
      id: user.id,
      first_name: xss(user.first_name),
      last_name: xss(user.last_name),
      user_email: xss(user.user_email),
      user_name: xss(user.user_name),
      date_created: new Date(user.date_created)
    };
  }
};

module.exports = UsersService;
