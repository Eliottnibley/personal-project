require('dotenv').config()
const express = require('express')
const socketio = require('socket.io')
const massive = require('massive')
const session = require('express-session')
const { Console } = require('console')
const authCtlr = require('./controllers/AuthController')
const mailer = require('./mailer')
const compCtlr = require('./controllers/companyController')
const path = require('path')
const { default: Axios } = require('axios')

const { SESSION_SECRET, SERVER_PORT, CONNECTION_STRING} = process.env

const app = express() 

app.use(express.static(`${__dirname}/../build`))
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
app.put('/api/auth/profile/:id', authCtlr.editUser)

// mailer endpoint
app.post('/api/mailer', mailer.mailer)

// company endpoints
app.get('/api/company/members/:id', compCtlr.getMembers)
app.get('/api/company/chat', compCtlr.getMessages)
app.get('/api/company/:userId', compCtlr.getProfile)
app.post('/api/company/message', compCtlr.postMessage)
app.get('/api/messages/unread/:userId/:chatRoom', compCtlr.getUnreadCount)
app.put('/api/messages/changeRead/:myId/:chatRoom', compCtlr.changeRead)

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
    let found = false
    for (let i = 0; i < loggedInUsers.length; i++) {
      if (loggedInUsers[i].userId == user.userId) {
        found = true
        break
      }
    }

    if (!found) {
      loggedInUsers.push(user)
    }
  }
  
  let companyloggedInUsers = []
  for (let i = 0; i < loggedInUsers.length; i++){
    if(loggedInUsers[i].companyId === user.companyId){
      companyloggedInUsers.push(loggedInUsers[i].userId)
    }
  }
  return companyloggedInUsers
}

// this will return if a user is curently logged in
app.get('/api/currentLogins/:companyId/:userId', (req, res) => {
  const {companyId, userId} = req.params
  const companyloggedIn = updateLoggedIn({companyId: parseInt(companyId)})
  
  res.status(200).send(companyloggedIn.includes(userId))
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

  socket.on('join new company', data => {
    io.to(data.room).emit('new company member', data)
  })

  socket.on('message to room', data => {
    io.to(data.room).emit('sending message to room', data)
  })
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})