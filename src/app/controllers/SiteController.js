const Post = require('../models/Post')

const {mutipleMongooseToObject, mongooseToObject} = require('../../util/mongoose')

class SiteController{
    index(req, res, next){
        Post.find({})
            .then(posts =>{
                res.render('home',{posts: mutipleMongooseToObject(posts)})
                // res.json(mutipleMongooseToObject(posts))
            })
            .catch(next)
    }
    show(req, res, next){
        Post.findOne({slug: req.params.slug})
            .then(post =>{
                res.render('show',{post: mongooseToObject(post)})
            })
            .catch(next)
    }
}

module.exports = new SiteController