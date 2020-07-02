import React, {useState} from 'react'
import {connect} from 'react-redux'
import Axios from 'axios'
import './JoinCompany.css'
import {useHistory} from 'react-router-dom'
import {loginUser} from'../../redux/userReducer'

function JoinCompany (props) {
  const [accessCode, setAccessCode] = useState('')
  const history = useHistory()

  if(!props.isLoggedIn){
    history.push('/')
  }

  if(props.user.companyId){
    history.push('/company')
  }

  async function submit () {
    const newCompany = {
      userId: props.user.userId,
      accessCode: accessCode
    }
    
    try{
      const res = await Axios.put('/api/auth/joincompany', newCompany)

      const user = res.data
    
      await props.loginUser(user)

      await props.socket.emit('join new company', {...user, room: `company ${user.companyId} room`})

      props.socket.emit('user logged in', {userId: user.userId, companyId: user.companyId, room: `company ${user.companyId} room`})
    }
    catch (err) {
      console.log(err)
      alert('Access code does not associate with any company')
    }
  }

  return (
    <div className='joincompany-container'>
      <h4>Join Company</h4>
      <p>This is where you can join a new company that you have been invited to. The invite from the admin of your company should contain a 10 digit code. Enter that code below to join.</p>
      <input value={accessCode} onChange={(e) => setAccessCode(e.target.value)} placeholder='Access Code'/>
      <button onClick={() => submit()}>Join Company</button>
    </div>
  )
}

const mapStateToProps = reduxState => reduxState
export default connect (mapStateToProps, {loginUser})(JoinCompany)