const express = require('express')
const { engine, handlebars } = require('express-handlebars')
const app = express()
const morgan = require('morgan')
const route = require('./route')
const path = require('path')
const db = require('./config/db')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const session = require('express-session')
const methodOverride = require('method-override')
const helpers = require('handlebars-helpers')
(
    {
        handlebars: handlebars
    },
    ['moment']
);

//config dotenv
dotenv.config({ path: path.join(__dirname, '.env') })
const PORT = process.env.PORT ||3000

//connect db
db.connect()

//session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(express.urlencoded({
    extended:true
}))

app.use(express.json())
app.use(cookieParser("ssaiiqohfofwfuiwe8r82hjkdqwuigd823b4"))

//hbs
app.engine('.hbs', engine(
    {
        extname: '.hbs',
        helpers:{
            sum: (a,b)=>a+b,
        }
    }));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

app.use(morgan('combined'))

//public
app.use(express.static(path.join(__dirname, 'public')))

//view engine
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources','views'));

//router
route(app)

app.listen(PORT,()=>{
    console.log("App running with port", PORT)
})