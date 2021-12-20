const {mutipleMongooseToObject, mongooseToObject} = require('../../util/mongoose')
const Post = require('../models/Post')
class PostsController{
    index(req, res, next){
        Post.find({})
        .then(posts =>{
            res.render('posts/store',{posts: mutipleMongooseToObject(posts)})
            // res.json(mutipleMongooseToObject(posts))
        })
        .catch(next)
    }
    create(req, res, next){
        res.render('posts/create')
    }
}

module.exports = new PostsController