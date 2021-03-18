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
    }
}