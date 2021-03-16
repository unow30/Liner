
module.exports = (req, res) => {
    const { pageId } = req.params
    res.json(`myhighlights/pages/${pageId}`)
}