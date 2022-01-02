const {mutipleMongooseToObject, mongooseToObject} = require('../../util/mongoose')
const Post = require('../models/Post')
const Category = require('../models/Catregory')
const path = require('path')
const  fs = require('fs');

class PostsController{

   
    index(req, res, next){
        Promise.all([Post.find({"author.idAuthor":req.session.user._id}), Post.countDocumentsDeleted({"author.idAuthor":req.session.user._id})])
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

        const ext= path.extname(req.file.originalname)
        const tempPath = req.file.path
        const imagePath = tempPath.split('\\').slice(2).join('/') + ext

        if(ext==='.png' || ext==='.jpg' || ext==='.jpeg' || ext==='.gif'){
            fs.rename(tempPath, tempPath + ext ,function(err){
                if(err) throw err;
            });
          }else{
              fs.unlink(tempPath,function(){
                  if(err) throw err;
                  res.json(500,{error:'Only image files are allowed'});
              });
          }


        const formData = {...req.body}
        formData.image = imagePath

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
        Post.findDeleted({"author.idAuthor":req.session.user._id})
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