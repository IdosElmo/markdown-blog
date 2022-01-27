const express = require('express')
const { render } = require('express/lib/response')
const router = express.Router()

router.get('/test', (req, res) => {
    res.send("Inside Article")
})

router.get('/new', (req, res) => {
    res.render("articles/newArticle")
})

router.post('/', (req, res) => {
    res.redirect("/")
})

module.exports = router