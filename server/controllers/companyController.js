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
  }
}