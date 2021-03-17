const { user } = require('../../models')
const { userCreateOptions } = require('../../options/userOptions')

//'../../lib/SHA256'에서 자동으로 가져오기 module export= (property) export=: (s: any) => string

module.exports = async (req, res) => {
    const { name, password } = req.body
    try {
        const [userInfo, created] = await user.findOrCreate(userCreateOptions(name, password))
        if (created) {
            res.status(201).json({ "message": "ok" })
        } else {
            res.status(409).json({ "error": "user is already exist" })
        }
    } catch (error) {
        console.log(error)
        res.json({ "error": error })
    }
}