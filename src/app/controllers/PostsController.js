const {mutipleMongooseToObject, mongooseToObject} = require('../../util/mongoose')
const Post = require('../models/Post')
const Category = require('../models/Catregory')
class PostsController{
    index(req, res, next){
        Post.find({})
        .then(posts =>{
            res.render('posts/stored',{posts: mutipleMongooseToObject(posts)})
            // res.json(mutipleMongooseToObject(posts))
        })
        .catch(next)
    }
    create(req, res, next){
        Category.find({})
            .then(categories=>{
                res.render('posts/create',{
                    categories:mutipleMongooseToObject(categories)
                })
            }
            )
            .catch(next)
    }

    store(req, res, next){

        const formData = {...req.body}

        formData.image = 'https://images.unsplash.com/photo-1636558286997-51038eca6a53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'
        formData.author = {
            nameAuthor: req.session.user.name,
            idAuthor:res.session.user._id
        }
       
        const post = new Post(formData)
        post.save()
            .then(
                res.redirect('/posts')
            )
            .catch(next)
    }
}

module.exports = new PostsController