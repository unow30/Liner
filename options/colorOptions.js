module.exports = {
    getThemeColor: (themeId) => {
        return { raw: true, where: { themeId: themeId }, attributes: ["num", "colorHex"] }
    },

    checkValidColor: (colorHex) => {
        return { raw: true, where: { colorHex: colorHex }, attributes: ["id"] }
    }
}