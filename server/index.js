require('dotenv').config()
const express = require('express')
const socketio = require('socket.io')
const massive = require('massive')
const session = require('express-session')
const { Console } = require('console')
const authCtlr = require('./controllers/AuthController')
const mailer = require('./mailer')
const compCtlr = require('./controllers/companyController')

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

// endpoints
app.post('/api/auth/register', authCtlr.register)
app.post('/api/auth/login', authCtlr.login)
app.delete('/api/auth/logout', authCtlr.logout)
app.post('/api/auth/registercompany', authCtlr.createCompany)
app.post('/api/auth/accesscode', authCtlr.getCode)
app.put('/api/auth/joincompany', authCtlr.joinCompany)

// mailer endpoint
app.post('/api/mailer', mailer.mailer)

// company endpoints
app.get('/api/company/members/:id', compCtlr.getMembers)

const server = app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))

const io = socketio(server)

let loggedInUsers = []

// takes in an object with the properties of userId and companyId. this function shoulc br triggered when a user logs in.
const updateLoggedIn = (user) => {
  if(user.userIdRemove) {
    const index = loggedInUsers.map(e => {
      return e.userId
    }).indexOf(user.userIdRemove)
    loggedInUsers.splice(index, 1)
  }
  else if(user.userId && user.companyId){
    loggedInUsers.push(user)
  }
  else {
  }
  
  let companyloggedInUsers = []
  for (let i = 0; i < loggedInUsers.length; i++){
    if(loggedInUsers[i].companyId === user.companyId){
      companyloggedInUsers.push(loggedInUsers[i].userId)
    }
  }
  return companyloggedInUsers
}

// this will return the users curently logged in
app.get('/api/currentLogins', (req, res) => {
  const {companyId} = req.query
  const companyloggedIn = updateLoggedIn({companyId: parseInt(companyId)})
  
  res.status(200).send(companyloggedIn)
})

io.on('connection', socket => {

  socket.on('join room', data => {
    socket.join(data.room)
  })

  // socket to keep track of who is logged in
  socket.on('user logged in', data => {
    let companyloggedInUsers = updateLoggedIn(data)
    io.to(data.room).emit('logged in array updated', companyloggedInUsers)
  })

  socket.on('user logged out', (data) => {
    let companyloggedInUsers = updateLoggedIn(data)
    io.to(data.room).emit('logged in array updated', companyloggedInUsers)
  })
})