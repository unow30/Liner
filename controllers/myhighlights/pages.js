const {
    isAuthorized
} = require('../tokenFunctions')
const { Page, Color, Highlight } = require('../../models')
const { } = require('../../options/colorOptions')
const { findPageId } = require('../../options/pageOptions')
const { getHighlightPageColor } = require('../../options/highlightOptions')
module.exports = async (req, res) => {

    try {
        const { userId, pageUrl, pageId } = req.body
        const { id } = isAuthorized(req)
        if (!pageId) {
            const pageInfo = await Page.findAll(findPageId(pageUrl, userId))
            const arr = pageInfo.map(el => {
                return el.id
            })
            const result = await Highlight.findAll(getHighlightPageColor(arr, Color, Page))
            result.forEach(el => { el['userId'] = userId })
            console.log(result)
            res.status(200).json(result)

        } else {
            const pageInfo = await Page.findOne({ raw: true, where: { id: pageId, userId: userId } })
            const result = await Highlight.findAll(getHighlightPageColor(pageInfo["id"], Color, Page))
            result.forEach(el => { el['userId'] = userId })
            res.status(200).json(result)
        }

    } catch (error) {
        console.log(error)
    }
}