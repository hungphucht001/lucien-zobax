const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

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

module.exports = mongoose.model('Post',Post);