const {mutipleMongooseToObject, mongooseToObject} = require('../../util/mongoose')

class CategoriesController{
    index(req, res, next){
        res.send('đw')
    }
}

module.exports = new CategoriesController