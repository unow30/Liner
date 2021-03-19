const {
    isAuthorized
} = require('../tokenFunctions')
const { Page, Highlight } = require('../../models')
const { findColorIdAndPageId } = require('../../options/highlightOptions')

module.exports = async (req, res) => {
    const { highlightId } = req.params
    const { userId } = req.body
    const { id } = isAuthorized(req)
    try {
        if (id === userId) {

            await Highlight.findOne(findColorIdAndPageId(highlightId)).then(async el => {
                await Page.destroy({ where: { id: el.pageId } })
            })
            await Highlight.destroy({
                where: {
                    id: highlightId
                }
            });
            res.status(200).json("200 ok")
        } else {
            res.status(404).json("can't delete highlights")
        }
    } catch (error) {
        console.log(error)
    }
}