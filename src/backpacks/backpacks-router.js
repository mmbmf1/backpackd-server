const express = require("express");
const path = require("path");
const BackpacksService = require("./backpacks-service");
const { requireAuth } = require("../middleware/jwt-auth");

const backpacksRouter = express.Router();
const jsonBodyParser = express.json();

backpacksRouter.route("/").get((req, res, next) => {
  BackpacksService.getAllBackpacks(req.app.get("db"))
    .then(backpacks => {
      res.json(backpacks);
    })
    .catch(next);
});

backpacksRouter.route("/:user_name").get(requireAuth, (req, res, next) => {
  BackpacksService.getUserBackpacks(req.app.get("db"), req.params.user_name)
    .then(backpacks => {
      console.log(backpacks)
      res.json(backpacks);
    })
    .catch(next);
});

backpacksRouter
  .route("/")
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { name, useritems, total } = req.body;
    const newBackpack = { name, useritems, total };

    for (const [key, value] of Object.entries(newBackpack))
      if (value === null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });

    console.log(req.user);

    newBackpack.user_id = req.user.id;

    BackpacksService.insertBackpack(req.app.get("db"), newBackpack)
      .then(backpack => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `${backpack.id}`))
          .json(BackpacksService.serializeBackpack(backpack));
      })
      .catch(next);
  });

module.exports = backpacksRouter;
