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

    const db = req.app.get('db')

    if(parseInt(userId) < parseInt(myId)){
      messages = await db.getMessages(userId, myId)
    }
    else {
      messages = await db.getMessages(myId, userId)
    }

    mess = messages.sort((a, b) => {
      const dateA = new Date(a.time)
      const dateB = new Date(b.time)

      return dateA.getTime() - dateB.getTime()
    })

    res.status(200).send(mess)
  },

  getProfile: async (req, res) => {
    const db = req.app.get('db')
    const {userId} = req.params
    
    const profile = await db.getmemberProfile(userId)

    res.status(200).send(profile[0])
  },

  postMessage: async (req, res) => {
    const db = req.app.get('db')
    const {message, time, sender, identifier, read} = req.body

    await db.postMessage(identifier, message, sender, time, read)

    res.sendStatus(200)
  },

  getUnreadCount: async (req, res) => {
    const db = req.app.get('db')
    const {chatRoom, userId} = req.params

    const count = await db.getUnread(chatRoom, userId)
    
    res.status(200).send(count[0])
  },

  changeRead: async (req, res) => {
    const db = req.app.get('db')
    const {chatRoom, myId} = req.params

    await db.changeMessagesRead(chatRoom, myId)

    res.sendStatus(200)
  }
}