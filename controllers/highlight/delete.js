

module.exports = (req, res) => {
    const { highlightId } = req.params
    res.json(`highlight/delete${highlightId}`)
}