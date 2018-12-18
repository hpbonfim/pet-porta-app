const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "PET-API-GATEWAY",
        version: "1.2.3"
    })
})

module.exports = router