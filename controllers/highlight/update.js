const {
    isAuthorized
} = require('../tokenFunctions')
const { findColorIdAndPageId } = require('../../options/highlightOptions')
const { findColorId } = require('../../options/colorOptions')
const { Page, Color, Highlight } = require('../../models')
module.exports = async (req, res) => {
    const { userId, colorHex, text } = req.body
    const highlightId = Number(req.params.highlightId)
    const { id, name, themeId } = isAuthorized(req)
    try {

        await Highlight.findOne(findColorIdAndPageId(highlightId))
            .then(async ele => {
                if (!colorHex) {
                    await Page.update({ text: text }, { where: { id: ele.pageId } })
                } else if (!text) {
                    await Color.findOne(findColorId(themeId, colorHex)).then(async col => {
                        await Highlight.update({ colorId: col.id }, { where: { id: highlightId } })
                    })
                } else {
                    await Page.update({ text: text }, { where: { id: ele.pageId } })
                    await Color.findOne(findColorId(themeId, colorHex)).then(async col => {
                        await Highlight.update({ colorId: col.id }, { where: { id: highlightId } })
                    })
                }

                res.status(201).json({
                    "highlightId": ele.id,
                    "userId": userId,
                    "pageId": ele.pageId,
                    "colorHex": colorHex,
                    "text": text
                })
            })

    } catch (error) {
        console.log(error)
    }
}