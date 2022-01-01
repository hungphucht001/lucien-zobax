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
    signin(req, res, next){
        res.render('signin',{layout: false})
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
    siginSubmit(req, res, next){
        const password = req.body.password
        if(password[0] === password[1]){
            const data = {
                name: req.body.name,
                username: req.body.username, 
                password: password[0]
            }
            const acc = new Account(data)
            acc.save()
                .then(()=>{
                    res.redirect('/auth/login')
                })
                .catch(()=>{
                    res.redirect('/auth/login')
                })
        }
        res.redirect('/auth/login')
    }
}

module.exports = new AuthController