const mongoose = require('mongoose')
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema
const slug = require('mongoose-slug-generator');

const Post = new Schema({
    title:{type:String},
    description:{type:String},
    author:{type:Object},
    image:{type:String},
    content:{type:String},
    comments:{type:Array},
    slug:{type:String, slug: "title", unique:true },
},{
    timestamps:true
})

mongoose.plugin(slug);
Post.plugin(mongoose_delete,{
    deletedAt:true,
    overrideMethods: 'all' 
});

module.exports = mongoose.model('Post',Post);