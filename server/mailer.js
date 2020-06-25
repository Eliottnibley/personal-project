const nodemailer = require('nodemailer')

module.exports = {
  mailer: async (req, res) => {
  
    let transporter = await nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'e.nibley@gmail.com',
        pass: 'eliottnibley1'
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

    let info = await transporter.sendMail({
      from: 'e.nibley@gmail.com',
      to: 'e.nibley@gmail.com',
      subject: 'Hello!',
      text: 'this is your first mail from nodmailer'
    })

    console.log(info.messageId)

    res.sendStatus(200)
  }
}