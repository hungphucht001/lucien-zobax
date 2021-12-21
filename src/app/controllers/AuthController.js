// const {mutipleMongooseToObject, mongooseToObject} = require('../../util/mongoose')

const Account = require('../models/Account')

class AuthController{
    login(req, res, next){
        if(!req.session.user)
        {
            res.render('login',{layout: false})
            return;
        }
        res.redirect("/posts")
    }

    loginSubmit(req, res, next){
        Account.findOne({username:req.body.username, password:req.body.password})
            .then(account => {
                if(account)
                {
                    req.session.user = account
                    res.redirect('/posts')
                }
                else{
                    res.json({message: 'Tài khoản hoặc mật khẩu không chính xác'})
                }
            }).catch(next)
    }
    logout(req, res, next){
        req.session.destroy()
        res.redirect('/auth/login')
    }
}

module.exports = new AuthController