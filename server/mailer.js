const nodemailer = require('nodemailer')

module.exports = {
  mailer: async (req, res) => {
    const {email, companyId} = req.body
  
    let transporter = await nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'workspace.mailer@gmail.com',
        pass: 'El!ott624'
      }
    })

    transporter.verify(function(error, success) {
      if (error) {
        console.log(error)
      }

      else {
        console.log('Server is ready for mail')
      }
    })

    const message = {
      from: 'WorkSpace <workspace.mailer@gmail.com>',
      to: email,
      subject: 'Join Company',
      html: `<p>Click <a href="http://localhost:3000/#/login/${companyId}">here</a> to join company</p>`
    }

    let info = await transporter.sendMail(message)
    .then(() => {
      return res.sendStatus(200)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
  }
}