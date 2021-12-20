// const {mutipleMongooseToObject, mongooseToObject} = require('../../util/mongoose')

const Account = require('../models/Account')

class AccountsController{
    login(req, res, next){
        res.render('login',{layout: false})
    }
    a(req, res, next){
        Account.findOne({username:req.body.username, password:req.body.password})
            .then(account => {
                if(account)
                {
                    res.json(account)
                }
            })
    }
}

module.exports = new AccountsController