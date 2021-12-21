const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Category = new Schema({
    name:{type:String}
},{
    timestamps:true
})

module.exports = mongoose.model('Category',Category);