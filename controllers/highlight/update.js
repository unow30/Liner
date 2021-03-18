const {
    isAuthorized
} = require('../tokenFunctions')

const { Page, Color, Highlight } = require('../../models')
module.exports = (req, res) => {
    // const { highlightId, userId, colorHex, text } = req.body
    // const { id, themeId } = isAuthorized(req)

    // const { colorId, pageId } = await Highlight.findOne({ raw: true, where: { id: highlightId } })

    // if (!colorHex) {
    //     await Page.update({ text: text }, { where: { pageId: pageId, } })
    // } else if (!text) {
    //     const findColor = await Color.findOne({ raw: true, where: { themeId: themeId, colorHex: colorHex } })
    //     await Highlight.update({ colorId: findColor.colorHex })
    // } else {

    // }

    // res.status(201).json({{
    //     "highlightId": 123,
    //     "userId": 12312,
    //     "pageId": 123,
    //     "colorHex": "#fffff8",
    //     "text": "변경된 텍스트입니다"
    // }})
}