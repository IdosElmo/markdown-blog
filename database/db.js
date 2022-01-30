const res = require('express/lib/response');
const { redirect } = require('express/lib/response');
const { MongoClient } = require('mongodb');
const slugify = require('slugify')

function Blog(post) {
    this.title = post.title;
    this.slug = post.slug;
    this.published = post.published;
    this.author = post.author;
    this.content = post.content;
    this.tags = post.tags;
}

// function Post(title, published, author, content, tags) {
//     this.title = title;
//     this.slug = slugify(this.title, { lower: true, strict: true });
//     this.published = published;
//     this.author = author;
//     this.content = content;
//     this.tags = tags;
// }

async function getPosts(client) {

    try {
        // verify connection
        await client.db("admin").command({ ping: 1 });
        console.log("Connection is alive");

        const posts = await client.db().collection("posts").find().toArray();
        return posts;
    }
    catch (e) {
        console.error(e);
    } 
}

async function listDatabases(client){
    await client.db("admin").command({ ping: 1 });
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

module.exports = {
    listDatabases: (c) => {
        return listDatabases(c);
    },

    test: () => {
        return console.log("test");
    },

    getPosts: (c) => {
        return getPosts(c);
    },

}