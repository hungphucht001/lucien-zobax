const siteRouter = require('./site')
const categorysRouter = require('./categories')
const postsRouter = require('./posts')

function route(app){
    app.use("/categorys",categorysRouter)
    app.use("/posts",postsRouter)
    app.use("/",siteRouter)
}
module.exports = route