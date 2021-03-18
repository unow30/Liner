const {
    isAuthorized
} = require('../tokenFunctions')
const { Page, Color, Highlight } = require('../../models')
const { checkValidColor } = require('../../options/colorOptions')
const { pageCreateOptions } = require('../../options/pageOptions')
const { createNewHighlight } = require('../../options/highlightOptions')

module.exports = async (req, res) => {
    const { id, name, themeId } = isAuthorized(req)
    const { userId, pageUrl, colorHex, text } = req.body
    try {
        if (id === userId) {
            const pageInfo = await Page.create(pageCreateOptions(id, pageUrl, text))
            const colorInfo = await Color.findOne(checkValidColor(colorHex))
            const highlightInfo = await Highlight.create(createNewHighlight(colorInfo.id, pageInfo.id))

            res.status(201).json({
                "highlightId": highlightInfo['id'],
                "userId": userId,
                "pageId": pageInfo.id,
                "colorHex": colorHex,
                "text": pageInfo.text
            })
        } else {
            res.status(404).json({ "error": "invalid userInfo" })
        }
    } catch (error) {
        console.log(error)
    }
}