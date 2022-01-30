const res = require('express/lib/response');
const { redirect } = require('express/lib/response');
const { MongoClient, ObjectID } = require('mongodb');
const { mongoURI } = require('./../config/keys')

function Blog() {
    this.title = null;
    this.slug = null;
    this.published = null;
    this.author = null;
    this.content = null;
    this.tags = null;
}

let _db; // '_' private

async function start() {
    _db = new MongoClient(mongoURI, 
        { useUnifiedTopology: true });

    try {
        // Connect to the MongoDB cluster
        await _db.connect();

        // verify connection
        await _db.db("admin").command({ ping: 1 });
        console.log("Connection is alive");
    
    } catch (e) {
        console.error(e);
    }
}

async function createNewPost(post) {
    try {
        // verify connection
        await _db.db("admin").command({ ping: 1 });

        const posts = await _db.db().collection("posts").insertOne(post);
        console.log("Successfully pushed new post to DB")
    }
    catch (e) {
        console.error(e);
    } 
}

async function getPosts() {

    try {
        // verify connection
        await _db.db("admin").command({ ping: 1 });

        const posts = await _db.db().collection("posts").find().toArray();
        return posts;
    }
    catch (e) {
        console.error(e);
    } 
}

async function deletePost(id) {
    try {
        // verify connection
        await _db.db("admin").command({ ping: 1 });

        const posts = await _db.db().collection("posts").deleteOne(
            {_id: new ObjectID(id)}
            
            
        )
    }
    catch (e) {
        console.error(e);
    } 
}

async function listDatabases(){
    await _db.db("admin").command({ ping: 1 });
    databasesList = await _db.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

module.exports = {
    listDatabases: () => {
        return listDatabases();
    },

    test: () => {
        return console.log("test");
    },

    getPosts: () => {
        return getPosts();
    },

    start: () => {
        return start();
    },

    Blog: () => {
        return new Blog()
    },

    newPost: (post) => {
        return createNewPost(post);
    },

    deletePost: (id) => {
        return deletePost(id);
    }

}