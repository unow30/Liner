const {
    isAuthorized
} = require('../tokenFunctions')
const { User, Page, Color, Highlight } = require('../../models')
const { } = require('../../options/colorOptions')
const { getHighlightInfo } = require('../../options/pageOptions')
const { changedThemeInfo, getPrevColorInfo } = require('../../options/colorOptions')

module.exports = async (req, res) => {
    const { userId, themeId } = req.body
    const { id } = isAuthorized(req)
    try {
        if (userId === id) {
            await User.update({ themeId: themeId }, { raw: true, where: { id: userId } })
            await Page.findAll(getHighlightInfo(userId, Highlight)).then(async res => {

                const checkList = await Color.findAll(changedThemeInfo(themeId))
                const pageIdArr = res.map(ele => { return ele['pageId'] })
                const colorIdArr = res.map(elee => { return elee['colorId'] })
                const prevColorInfo = await Color.findAll(getPrevColorInfo(colorIdArr, Highlight))

                prevColorInfo.forEach(async (el, idx) => {
                    checkList.forEach(async ele => {
                        if (ele.num === el.num) {
                            await Highlight.update({ colorId: ele.id }, { where: { pageId: pageIdArr[idx] } })
                        }
                    })
                })
            })
            res.status(200).json("theme change")
        } else {
            res.status(200).json("invalid userInfo")
        }

    } catch (error) {
        console.log(error)
    }
}
// res.forEach(async (el, idx) => {
//     checkList.forEach(async ele => {
//         if (ele.num === el.num) {
//             await Highlight.update({ colorId: ele.id }, { where: { pageId: pageIdArr[idx] } })//pageId값이 res.id인 highligh의 color를 변경
//         }
//     })
// })