const {
    isAuthorized
} = require('../tokenFunctions')
const { Page, Color, Highlight } = require('../../models')
const { } = require('../../options/colorOptions')
const { getHighlightPageColor } = require('../../options/highlightOptions')

module.exports = async (req, res) => {

    try {
        const { userId } = req.body
        const { id } = isAuthorized(req)

        if (id === userId) {
            const pageInfo = await Page.findAll({ raw: true, userId: userId, attributes: [["id", "pageId"], "pageUrl"] })
            let arr = pageInfo.map(el => {
                return el.pageId
            })

            const result = await Highlight.findAll(getHighlightPageColor(arr, Color, Page))
            result.forEach(el => { el['userId'] = userId })

            pageInfo.forEach((el, idx) => {
                el["highlights"] = result[idx]
            })
            res.status(200).json(pageInfo)
        }

    } catch (error) {
        console.log(error)
    }
}