const express = require('express');
const router = express.Router();
const db = require('./../database/db')
const slugify = require('slugify')

router.get('/test', (req, res) => {
    res.send("Inside Article")
})

router.get('/new', (req, res) => {
    res.render("articles/newArticle")
})  

router.post('/', async (req, res, next) => {
    req.post = db.Blog()
    next()
  }, saveArticleAndRedirect('new'))

router.delete('/:id', async (req, res) => {
    await db.deletePost(req.params.id)
    res.redirect('/')
})

function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let post = req.post
        post.title = req.body.title
        post.content = req.body.description
        post.author = req.body.author
        post.published = true
        post.slug = slugify(req.body.title, { lower: true, strict: true })

        try {
            await db.newPost(post)
            res.redirect(`/`)
        } 
        catch (e) {
            console.log(e)
        }
    }   
}

module.exports = router