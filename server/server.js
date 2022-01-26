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
    res.render('index')
})


app.listen(5000)