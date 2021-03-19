module.exports = {
    getThemeColor: (themeId) => {
        return { raw: true, where: { themeId: themeId }, attributes: ["num", "colorHex"] }
    },

    checkValidColor: (colorHex) => {
        return {
            raw: true,
            where: { colorHex: colorHex },
            attributes: ["id"],
        }
    },
    findColorId: (themeId, colorHex) => {
        return {
            raw: true,
            where: {
                themeId: themeId,
                colorHex: colorHex
            },
            attributes: ["id"]
        }
    },

    changedThemeInfo: (themeId) => {
        return { raw: true, where: { themeId: themeId }, attributes: ["id", "themeId", "colorHex", "num"] }
    },

    getPrevColorInfo: (colorIdArr, Highlight) => {
        return { raw: true, where: { id: colorIdArr }, attributes: ["id", "themeId", "colorHex", "num"], include: [{ model: Highlight, attributes: ['pageId'] }] }
    },

}