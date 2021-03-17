const {
    generateAccessToken,
    generateRefreshToken,
    sendRefreshToken,
    sendAccessToken
} = require('../tokenFunctions')
const { user, color } = require('../../models')
const { findUserNameInDB, validUserLogin, tokenAlements } = require('../../options/userOptions')
const { getThemeColor } = require('../../options/colorOptions')
require('dotenv').config()

module.exports = async (req, res) => {
    const { name, password } = req.body
    try {
        const validUser = await user.findOne(findUserNameInDB(name))
        const loginUser = await user.findOne(validUserLogin(validUser.name, password))
        if (loginUser) {
            const colorInfo = await color.findAll(getThemeColor(loginUser.themeId,))
            const accessToken = generateAccessToken(tokenAlements(loginUser));
            const refreshToken = generateRefreshToken(tokenAlements(loginUser));

            sendRefreshToken(res, refreshToken)
            sendAccessToken(res, accessToken, colorInfo)
        } else {
            res.status(404).json({ "error": "can't find user" })
        }

    } catch (error) {
        console.log(error)
        res.json({ "error": error })
    }
}
