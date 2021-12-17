const {mutipleMongooseToObject, mongooseToObject} = require('../../util/mongoose')
const Post = require('../models/Post')
class PostsController{
    index(req, res, next){
        Post.find({})
        .then(posts =>{
            res.render('posts/index',{posts: mutipleMongooseToObject(posts)})
            // res.json(mutipleMongooseToObject(posts))
        })
        .catch(next)
    }
    store(req, res, next){
        res.render('posts/store')
    }
}

module.exports = new PostsController