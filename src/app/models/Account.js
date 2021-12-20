const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Account = new Schema({
    name:{type: 'string'},
    username:{type: 'string'},
},{
    timestamps:true
})

module.exports = mongoose.model('Account',Account);