const siteRouter = require('./site')
const categorysRouter = require('./categories')
const postsRouter = require('./posts')
const authRouter = require('./auth')
const middleware = require('../middlewares/auth')

function route(app){
    app.use("/categorys",categorysRouter)
    app.use("/auth",authRouter)
    app.use("/posts",middleware.requireAuth,postsRouter)
    app.use("/",siteRouter)
}
module.exports = route