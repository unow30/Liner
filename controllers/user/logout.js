
module.exports = (req, res) => {
    const authorization = req.headers.authorization
    if (!authorization) {
        res.status(404).json({ "error": "it can't logout" })
    } else {
        req.headers.authorization = null
        res.clearCookie('refreshToken')
        res.status(200).json({ "message": "logout success" })
    }
}