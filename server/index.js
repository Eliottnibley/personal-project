require('dotenv').config()
const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const massive = require('massive')
const session = require('express-session')
const { Console } = require('console')

const { SESSION_SECRET, SERVER_PORT, CONNECTION_STRING} = process.env

const app = express() 

app.use(express.json())


app.use(
  session({
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24},
    secret: SESSION_SECRET
  })
)

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
})
.then(db => {
  app.set('db', db)
  console.log('connected to database')
})

const server = app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))

const io = socketio(server)

io.on('connection', socket => {
  console.log('socket connected')
})