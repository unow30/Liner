const {
    isAuthorized
} = require('../tokenFunctions')

const { page, color, highlights, theme } = require('../../models')
const { checkValidColor } = require('../../options/colorOptions')
const { pageCreateOptions } = require('../../options/pageOptions')
const { createNewHighlights } = require('../../options/highlightOptions')

module.exports = async (req, res) => {
    const { id, name, themeId } = isAuthorized(req)
    const { pageUrl, colorHex, text } = req.body
    try {

        const pageInfo = await page.create(pageCreateOptions(id, pageUrl, text))
        const colorInfo = await color.findOne(checkValidColor(colorHex))
        const highlightInfo = await highlights.create(createNewHighlights(colorInfo.colorId, pageInfo.pageId))

        res.status(201).json({ "message": "ok" })
    } catch (error) {
        console.log(error)
    }
}