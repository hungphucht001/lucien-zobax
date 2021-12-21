const Account = require('../app/models/Account');

module.exports.requireAuth = function (req, res, next){
    if(!req.session.user){
        res.redirect('/auth/login');
        return;
    }
    Account.findOne({username:req.session.user.username})
        .then(account => {
            if(!account)
            {
                res.redirect('/auth/login');
                return;
            }
            res.locals.user = account.toObject()
            res.cookie('nameAuthor',account, { signed: true })
            next()
        })
        .catch(next)
}