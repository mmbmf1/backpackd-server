const express = require("express");
const path = require("path");
const UsersService = require("./users-service");

const usersRouter = express.Router();
const jsonBodyParser = express.json();

usersRouter.post("/", jsonBodyParser, (req, res, next) => {
  const { first_name, last_name, user_email, user_name, password } = req.body;

  for (const field of [
    "first_name",
    "last_name",
    "user_email",
    "user_name",
    "password"
  ])
    if (!req.body[field])
      return res.status(400).json({
        error: `Missing '${field}' in request body`
      });
  const passwordError = UsersService.validatePassword(password);

  if (passwordError) return res.status(400).json({ error: passwordError });

  UsersService.hasUserWithEmail(req.app.get("db"), user_email).then(
    hasUserWithUserEmail => {
      if (hasUserWithUserEmail)
        return res.status(400).sjson({ error: `${user_email} already in use` });
    }
  );

  UsersService.hasUserWithUserName(req.app.get("db"), user_name)
    .then(hasUserWithUserName => {
      if (hasUserWithUserName)
        return res.status(400).json({ error: "Username aleady exists" });

      return UsersService.hashPassword(password).then(hashedPassword => {
        const newUser = {
          first_name,
          last_name,
          user_email,
          user_name,
          password: hashedPassword,
          date_created: "now()"
        };

        return UsersService.insertUser(req.app.get("db"), newUser).then(
          user => {
            res.status(201).json(UsersService.serializeUser(user));
          }
        );
      });
    })
    .catch(next);
});

module.exports = usersRouter;
