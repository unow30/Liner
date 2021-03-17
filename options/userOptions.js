const sha256 = require('../lib/SHA256')
module.exports = {
    userCreateOptions: (name, password) => {
        return {
            where: {
                name: name
            },
            defaults: {
                name: name,
                password: sha256(password + process.env.SALT),
                isPremium: true,
                themeId: 1
            }
        }
    },

    findUserNameInDB: (name) => {
        return {
            raw: true,
            where: {
                name: name
            },
            attributes: ["name"]
        }
    },

    validUserLogin: (name, password) => {
        return {
            raw: true,
            where: {
                name: name,
                password: sha256(password + process.env.SALT)
            }
        }
    },

    tokenAlements: (loginUser) => {
        const { id, name, password, themeId } = loginUser
        return { id: id, name: name, password: password, themeId: themeId }
    }
}