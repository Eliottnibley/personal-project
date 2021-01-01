module.exports = {
  getMembers: async (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    
    if(!id) {
      res.sendStatus(404)
    }
    else {
      const members = await db.getMembers(id)

      if (!members[0]){
        return res.status(404).send('no users were found in company')
      }

      res.status(200).send(members)
    }
  },

  getMessages: async(req, res) => {
    const {userId, myId} = req.query

    let messages = []

    if(parseInt(userId) < parseInt(myId)){
      const db = req.app.get('db')
      messages = await db.getMessages(userId, myId)
    }
    else {
      const db = req.app.get('db')
      messages = await db.getMessages(myId, userId)
    }

    res.status(200).send(messages)
  },

  getProfile: async (req, res) => {
    const db = req.app.get('db')
    const {userId} = req.params
    
    const profile = await db.getmemberProfile(userId)

    res.status(200).send(profile[0])
  },

  postMessage: async (req, res) => {
    const db = req.app.get('db')
    const {text, time, sender, identifier, read} = req.body
    console.log(time)

    await db.postMessage(identifier, text, sender, time, read)

    res.sendStatus(200)
  }
}