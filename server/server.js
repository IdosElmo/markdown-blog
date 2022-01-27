const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./../routes/article')
const app = express()

// mongoose.connect('mongodb://localhost/blog', {
//   useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
// })

app.set('view engine', 'ejs')

app.use('/articles', articleRouter)

// app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {

    const articles = [{
        title: "article title",
        createdAt: new Date(),
        description: "description",
        markdown: "markdown"
    },
    {
        title: "second article title",
        createdAt: new Date(),
        description: "description",
        markdown: "markdown"
    },
    {
        title: "third article title",
        createdAt: new Date(),
        description: "description",
        markdown: "markdown"
    }]

    res.render('articles/index', { 
        title: "Welcome to my Markdown-blog",
        articles: articles,
    })
})


app.listen(5000)