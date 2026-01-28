const jwt = require('jsonwebtoken')

const generateTokens = async (user) => {
    return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_key)
}

module.exports = { generateTokens };