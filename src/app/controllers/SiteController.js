const Post = require('../models/Post')

const {mutipleMongooseToObject, mongooseToObject} = require('../../util/mongoose')

class SiteController{
    index(req, res, next){
        let page = parseInt(req.query.page) || 1
        let perPage = 5
        let start = (page - 1) * perPage 
        let pageNext = page + 1
        let pagePrev = page ===1 ? 1:page - 1
        Post.find({}).skip(start).limit(perPage)
            .then(posts =>{
                res.render('home',{
                    posts: mutipleMongooseToObject(posts),
                    pageNext: pageNext,
                    pagePrev: pagePrev
                })
            })
            .catch(next)
    }
    show(req, res, next){
        Post.findOne({slug: req.params.slug})
            .then(post =>{
                if(post){
                    res.render('show',{post: mongooseToObject(post)})
                }
                else res.redirect('/')
            })
            .catch(next)
    }
}
module.exports = new SiteController