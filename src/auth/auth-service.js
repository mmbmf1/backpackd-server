const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')

const AuthService = {
    getUserWithUserName(db, user_name) {
        return db('backpackd_users')
            .where({ user_name })
            .first()
    },

    comparePasswords(password, hash) {
        return bcrypt.compare(password, hash)
    },

    createJwt(subject, payload) {
        return jwt.sign(payload, config.JWT_SECRET, {
            subject,
            expiresIn: config.JWT_EXPIRY,
            algorithm: 'HS256'
        })
    },
}

module.exports = AuthService
