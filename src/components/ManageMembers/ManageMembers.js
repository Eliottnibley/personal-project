import React, {useState} from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'

function ManageMembers (props) {
  const [email, setEmail] = useState('')

  function sendInvite () {
    Axios.post('/api/mailer', {email: email, companyId: props.user.companyId})
    .then(res => {
      console.log('the email sent')
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <div className='managemembers-container'>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email'></input>
      <button onClick={() => sendInvite()}>Invite New Member</button>
    </div>
  )
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps)(ManageMembers)