const {mutipleMongooseToObject, mongooseToObject} = require('../../util/mongoose')
const Post = require('../models/Post')
const Category = require('../models/Catregory')
class PostsController{


    index(req, res, next){

        Promise.all([Post.find({}), Post.countDocumentsDeleted()])
            .then(([posts, deletedCount]) =>{
                res.render('posts/stored',{
                    posts: mutipleMongooseToObject(posts),
                    deletedCount
                })
            })
            .catch(next)
    }


    create(req, res, next){
        Category.find({})
            .then(categories=>{
                res.render('posts/create',{
                    categories:mutipleMongooseToObject(categories)
                })
            })
            .catch(next)
    }

    store(req, res, next){

        const formData = {...req.body}
        // formData.image = 'https://images.unsplash.com/photo-1636558286997-51038eca6a53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'
        console.log(req.session.user)

        const user = {...req.session.user}

        formData.author = {
            nameAuthor: user.name,
            idAuthor: user._id
        }
       
        const post = new Post(formData)
        post.save()
            .then(
                res.redirect('/posts')
            )
            .catch(next)
    }

    edit(req, res, next) {
        Promise.all([Post.findOne({_id: req.params.id}), Category.find({})])
            .then(([post,categories])=>{
                res.render('posts/edit',
                {
                    post: mongooseToObject(post),
                    categories: mutipleMongooseToObject(categories)
                })
            })
            .catch(next)
    }

    update(req, res, next) {
        const formData = {...req.body}
        Post.updateOne({_id: req.params.id}, formData)
            .then(()=> res.redirect('/posts'))
            .catch(next)
    }
    destroy(req, res, next) {
        Post.delete({_id:req.params.id})
            .then(()=>res.redirect('back'))
            .catch(next)
    }
    trash(req, res, next) {
        Post.findDeleted({})
        .then(posts =>{
            res.render('posts/trash',{posts: mutipleMongooseToObject(posts)})
            // res.json(mutipleMongooseToObject(posts))
        })
        .catch(next)
    }
    restore(req, res, next){
        Post.restore({_id:req.params.id})
        .then(() =>{
            res.redirect('back')
        })
        .catch(next)
    }
    forceDestroy(req, res, next){
        Post.deleteOne({_id:req.params.id})
            .then(()=>res.redirect('back'))
            .catch(next)
    }
}

module.exports = new PostsController