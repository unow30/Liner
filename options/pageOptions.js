module.exports = {
    pageCreateOptions: (id, pageUrl, text) => {
        return {
            "userId": id,
            "pageUrl": pageUrl,
            "text": text
        }
    },

}