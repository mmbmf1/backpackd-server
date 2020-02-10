const express = require('express')
const BackpacksService = require('./backpacks-service')
// const { requireAuth } = require('../middleware/jwt-auth')

const backpacksRouter = express.Router()

backpacksRouter
    .route('/')
    .get((req, res, next) => {
        BackpacksService.getAllBackpacks(req.app.get('db'))
            .then(backpacks => {
                res.json(backpacks)
            })
            .catch(next)
    })

module.exports = backpacksRouter    