const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, 'pet-secret')
        req.userData = decoded
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json()
    }
}