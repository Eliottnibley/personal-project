const bcrypt = require('bcrypt')

module.exports = {
  login: async (req, res) => {
    const db = req.app.get('db')
    const {email, password} = req.body

    let user = await db.checkUserNoCompany(email)
    
    if (user[0].company_id) {
      user = await db.checkUser(email)
    }
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
          companyId: user[0].company_id,
          companyName: user[0].name
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
    const {firstname, lastname, email, password, profilePic, isAdmin, companyId} = req.body
    company = parseInt(companyId)

    const existingUser = await db.checkUser(email)

    if(existingUser[0]){
      return res.status(409).send('user already exists')
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    
    if (company === 0){
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
    }
    else {
      const user = await db.registerUserAndCompany(firstname, lastname, email, hash, profilePic, isAdmin, companyId)

      req.session.user = {
        userId: user[0].id,
        firstname: user[0].firstname,
        lastname: user[0].lastname,
        email: user[0].email,
        profilePic: user[0].profile_pic,
        isAdmin: user[0].is_admin,
        companyId: user[0].company_id,
        companyName: user[0].name
      }
      return res.status(200).send(req.session.user)
    }
  },

  logout: (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  },

  createCompany: async (req, res) => {
    const db = req.app.get('db')
    const {name} = req.body

    function genCode () {
      const options = 'abcdefghjkmnopqrstuvwxyzABCDEFGHJKMNOPQRSTUVWXYZ0123456789'
      let accessCode = ''
      
      for (let i = 0; i < 10; i++) {
        accessCode += options[Math.floor(Math.random() * options.length)]
      }
      return accessCode
    }

    let codes = await db.getAllAccessCodes()
    codes = codes.map((elem) => elem.access_code)
    console.log(codes)

    let accessCode = genCode()

    while (codes.includes(accessCode)) {
      accessCode = getCode()
    }

    const company = await db.registerCompany(name, accessCode)

    res.status(200).send(company[0])
  },

  getCode: async (req, res) => {
    const db = req.app.get('db')
    const {companyId} = req.body

    let accessCode = await db.getCode(companyId)
    
    res.status(200).send(accessCode[0])
  },

  joinCompany: async (req, res) => {
    const db = req.app.get('db')
    const {userId, accessCode} = req.body

    const company = await db.checkCompany(accessCode)

    if(!company[0]) {
      return res.status(404).send('Access code does not associate with any company')
    }
    
    const companyId = company[0].id

    const user = await db.joinCompany(userId, companyId)

    req.session.user = {
      userId: user[0].id,
      firstname: user[0].firstname,
      lastname: user[0].lastname,
      email: user[0].email,
      profilePic: user[0].profile_pic,
      isAdmin: user[0].is_admin,
      companyId: user[0].company_id,
      companyName: user[0].name
    }

    return res.status(200).send(req.session.user)
  },

  editUser: async (req, res) => {
    const db = req.app.get('db')
    const {firstname, lastname, email, profilePic, companyId} = req.body
    const {id} = req.params

    const user = await db.editUser(parseInt(id), firstname, lastname, email, profilePic)

    if (!user[0]) {
      return res.sendStatus(404)
    }

    res.status(200).send(user[0])
  }
}