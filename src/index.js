const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const morgan = require('morgan')
const route = require('./route')
const path = require('path')
const db = require('./config/db')
const dotenv = require('dotenv')
dotenv.config({ path: path.join(__dirname, '.env') })
db.connect()
const PORT = process.env.PORT ||3000

app.engine('.hbs', engine(
    {
        extname: '.hbs',
        helpers:{
            sum: (a,b)=>a+b
        }
    }));

app.use(morgan('combined'))

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources','views'));

route(app)

app.listen(PORT,()=>{
    console.log("running port ", PORT)
})