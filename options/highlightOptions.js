const Sequelize = require('sequelize');
module.exports = {
    createNewHighlight: (colorId, pageId) => {
        return {
            colorId: colorId,
            pageId: pageId
        }
    },

    findColorIdAndPageId: (highlightId) => {
        return {
            raw: true,
            where: { id: highlightId },
            attributes: ["id", "colorId", "pageId"]
        }
    },

    getHighlightPageColor: (pageId, Color, Page) => {
        return {
            raw: true,
            where: {
                pageId: pageId
            },
            attributes: [
                ["id", "highlightId"],
                "pageId",
                'color.colorHex',
                [Sequelize.literal('`Color`.`colorHex`'), 'colorHex'],
                'Page.text',
                [Sequelize.literal('`Page`.`text`'), 'text'],
            ],
            include: [
                { model: Color, attributes: [] },
                { model: Page, attributes: [] }
            ]
        }
    }

}