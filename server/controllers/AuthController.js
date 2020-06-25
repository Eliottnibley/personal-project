const bcrypt = require('bcrypt')

module.exports = {
  login: async (req, res) => {
    const db = req.app.get('db')
    const {email, password} = req.body

    const user = await db.checkUser(email)
    if(!user[0]){
      return res.status(404).send('User does not exist')
    }
    else {
      const authenticated = bcrypt.compareSync(password, user[0].password)
      if (authenticated) {
        req.session.user = {
          userId: user[0].id,
          firstname: user[0].firstname,
          lastname: user[0].lastname,
          email: user[0].email,
          profilePic: user[0].profile_pic,
          isAdmin: user[0].is_admin,
          companyId: user[0].company_id
        }
        return res.status(200).send(req.session.user)
      }
      else {
        return res.status(403).send('Email or password incorrect')
      }
    }
  },

  register: async (req, res) => {
    const db = req.app.get('db')
    const {firstname, lastname, email, password, profilePic, isAdmin} = req.body

    const existingUser = await db.checkUser(email)
    if(existingUser[0]){
      return res.status(409).send('user already exists')
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const user = await db.registerUser(firstname, lastname, email, hash, profilePic, isAdmin)

    req.session.user = {
      userId: user[0].id,
      firstname: user[0].firstname,
      lastname: user[0].lastname,
      email: user[0].email,
      profilePic: user[0].profile_pic,
      isAdmin: user[0].is_admin,
      companyId: user[0].company_id
    }
    return res.status(200).send(req.session.user)
  },

  logout: (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  },

  createCompany: async (req, res) => {
    const db = req.app.get('db')
    const {name} = req.body

    const existingCompany = await db.checkCompany(name)

    if (existingCompany[0]) {
      return res.status(409).send('company name is already taken')
    }

    const company = await db.registerCompany(name)

    res.status(200).send(company)
  },

  joinCompany: async (req, res) => {

  }
}