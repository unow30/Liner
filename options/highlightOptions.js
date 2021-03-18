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


}