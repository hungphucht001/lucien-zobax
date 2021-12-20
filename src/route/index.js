const siteRouter = require('./site')
const categorysRouter = require('./categories')
const postsRouter = require('./posts')
const accountsRouter = require('./accounts')

function route(app){
    app.use("/categorys",categorysRouter)
    app.use("/accounts",accountsRouter)
    app.use("/posts",postsRouter)
    app.use("/",siteRouter)
}
module.exports = route