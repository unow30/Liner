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
            attributes: [["id", "highlightId"], "pageId"],
            include: [
                { model: Color, attributes: ["colorHex"] },
                { model: Page, attributes: ["text"] }
            ]
        }
    }

}