const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const http = require('http')
const hbs = require('express-handlebars')

const InMemoryCargosStore = require('./models/cargo-memory').InMemoryCargoStore
let cargosStore = new InMemoryCargosStore()
exports.cargosStore = cargosStore

const appsupport = require('./appsupport')
const indexRouter = require('./routes/index')
const cargosRouter = require('./routes/cargos')

const app = express()
exports.app = app

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'default',
    layoutsDir: __dirname+'/views/layouts',
    partialsDir: __dirname + '/views/partials'
}))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
//this will be executed everytime request comes in

//Router function lists
app.use('/', indexRouter)
app.use('/cargos', cargosRouter)

//Error handlers
app.use(appsupport.basicErrorHandler)
app.use(appsupport.handle404)

const port = appsupport.normalizePort(process.env.PORT || '3000')
exports.port = port
app.set('port', port)

const server = http.createServer(app);
exports.server = server
server.listen(port)
server.on('error', appsupport.onError)
server.on('listening', appsupport.onListening);



