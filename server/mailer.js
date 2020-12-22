const nodemailer = require('nodemailer')

module.exports = {
  mailer: async (req, res) => {
    const {email, accessCode} = req.body
    console.log(accessCode)
  
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

    const container = 'background-color:rgb(242,242,242);height:300px;width:500px;margin:auto;padding:10px;text-align:center;'
    const titleStyle = 'background-color:dodgerblue;width:500px;margin:auto;text-align:center;padding:10px;font-size:30px;font-weight:600;color:white;'
    const welcome = 'font-size:20px;color:black;font-weight:500;margin:5px;'
    const invite = 'font-size:15px;margin:5px;color:black;'
    const company = 'font-size:25px;color:dodgerblue;font-weight:600;margin:5px;'
    const instructions = 'color:black;font-size:12px;margin-top:10px;'
    const code = 'font-size:25px;color:dodgerblue;margin:10px;font-weight:600px;'

    const htmlMail = `<div><div style=${titleStyle}>Awayoffice365</div><div style=${container}><div style=${welcome}>Welcome to Awayoffice365!</div><div style=${invite}>You have been invited by person to join a group by the name</div><div style=${company}>companyName</div><div style=${instructions}>Once you have created an account at awayoffice365.com, navigate to the company page and enter your access code where promted to join this group.</div><div style=${code}>${accessCode}</div></div></div>`

    const message = {
      from: 'WorkSpace <workspace.mailer@gmail.com>',
      to: email,
      subject: 'Join Company',
      text: `The code to join the company you have been invited to is ${accessCode}`,
      html: htmlMail
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