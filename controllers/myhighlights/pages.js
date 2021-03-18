const {
    isAuthorized
} = require('../tokenFunctions')
const { Page, Color, Highlight } = require('../../models')
const { } = require('../../options/colorOptions')
const { findPageId } = require('../../options/pageOptions')
const { getHighlightPageColor } = require('../../options/highlightOptions')
module.exports = async (req, res) => {

    const { userId, pageUrl, pageId } = req.body
    const { id } = isAuthorized(req)
    try {

        if (id === userId && !pageId) {
            const pageInfo = await Page.findAll(findPageId(pageUrl, userId))
            const pageId = pageInfo.map(el => {
                return el.id
            })

            const result = await Highlight.findAll(getHighlightPageColor(pageId, Color, Page))
            result.forEach(el => { el['userId'] = userId })
            res.status(200).json(result)

        } else if (id === userId && !pageUrl) {

            const pageInfo = await Page.findAll({ where: { id: pageId, userId: userId } })
            const pageId = pageInfo.map(el => {
                return el.id
            })

            const result = await Highlight.findAll(getHighlightPageColor(pageId, Color, Page))
            result.forEach(el => { el['userId'] = userId })
            res.status(200).json(result)
        }
    } catch (error) {
        console.log(error)
    }
}