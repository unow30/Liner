const Sequelize = require('sequelize');

module.exports = {
    pageCreateOptions: (id, pageUrl, text) => {
        return {
            "userId": id,
            "pageUrl": pageUrl,
            "text": text
        }
    },

    findPageId: (pageUrl, userId) => {
        return { raw: true, where: { pageUrl: pageUrl, userId: userId }, attributes: ['id', 'text'] }
    },

    findUserPages: (userId, Highlight) => {
        return {
            raw: true,
            where: { userId: userId },
            attributes: [['id', 'pageId'], 'pageUrl', 'text'],
            include: [
                { model: Highlight, attributes: ["id", "colorId"] }]
        }
    },
    getHighlightInfo: (userId, Highlight) => {
        return {
            raw: true, where: { userId: userId },
            attributes: [["id", "pageId"], "highlights.colorId", [Sequelize.literal('`highlights`.`colorId`'), 'colorId']],
            include: { model: Highlight, attributes: [] }
        }
    }
}