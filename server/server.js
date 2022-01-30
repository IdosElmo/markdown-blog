const express = require('express');
const db = require('./../database/db');
const { MongoClient } = require('mongodb');
const articleRouter = require('./../routes/article');
const bodyparser = require('body-parser');
const path = require('path');
const cors = require('cors');
const { post } = require('./../routes/article');
const {mongoURI} = require('./../config/keys')

const port = process.env.PORT || 5000;

const client = new MongoClient(mongoURI, 
    { useUnifiedTopology: true });

client.connect();

// initialize express
const app = express()

// add body parser to server
app.use(bodyparser.urlencoded({extended: false}));

// add json to server
app.use(bodyparser.json());

// add cors to server
app.use(cors());

app.set('view engine', 'ejs')

app.use('/articles', articleRouter)

app.get('/', async (req, res) => {

    const postss = await db.getPosts(client)

    res.render('articles/index', { 
        title: "Welcome to my Markdown-blog",
        posts: postss,
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})