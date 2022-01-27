const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send("Inside Article")
})

router.get('/new', (req, res) => {
    res.render("articles/newArticle")
})

module.exports = router