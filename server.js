const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const todoRoutes = require('./routes/todos')
const rewardRoutes = require('./routes/rewards')
const userRoutes = require('./routes/users')

require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

connectDB()

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))

//Enable Layouts
const expressLayouts = require('express-ejs-layouts')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)

//Favicon
const path = require('path')
const favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname, 'public', 'favicon.jpg')))

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
  
app.use('/', mainRoutes)
app.use('/todos', todoRoutes)
app.use('/rewards', rewardRoutes)
app.use('/users', userRoutes)
 
app.listen(process.env.PORT || 3000, function() {
  console.log(`listening on http://localhost:${3000}`)
})   